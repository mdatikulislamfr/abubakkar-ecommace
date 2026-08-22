import { Request, Response } from "express";
import slugify from "slugify";

import { Category } from "../../../@types/table.js";

import Controller from "./Controller.js";
import { CategoryModel } from "../../Models/categorys.model.js";
import { ActivityLogsModel } from "../../Models/activity_logs.model.js";

import { _error, _success } from "../../helpers/appHelper.js";
import STATUS from "../../../config/status.js";
import { caseEvent } from "../../Events/index.js";
import { Case } from "../../../@types/event.js";

export default new (class CategoryController extends Controller {

    /**
     * Get all categories.
     *
     * Supports:
     * - Pagination
     * - Search by category name
     * - Sorting
     */
    index = async (req: Request, res: Response) => {
        try {
            const page = Math.max(Number(req.query.page) || 1, 1);
            const limit = Math.min(
                Math.max(Number(req.query.limit) || 20, 1),
                100
            );

            const offset = (page - 1) * limit;
            const search = String(req.query.search || "").trim();

            const query = CategoryModel.table();

            if (search) {
                query.where("name", "like", `%${search}%`);
            }

            // const [{ total }] = await query
            //     .clone()
            //     .clearSelect()
            //     .clearOrder()
            //     .count<{ total: number }>("id as total");

            const categories = await query
                .select("*")
                .orderBy("sort_order", "asc")
                .orderBy("id", "desc")
                .limit(limit)
                .offset(offset);

            return res
                .status(STATUS.OK)
                .json(
                    _success({
                        message: "Categories retrieved successfully",
                        data: categories,
                        // meta: {
                        //     page,
                        //     limit,
                        //     total: Number(total),
                        //     totalPages: Math.ceil(Number(total) / limit),
                        // },
                    })
                );

        } catch (error) {
            return res
                .status(STATUS.INTERNAL_SERVER_ERROR)
                .json(
                    _error({
                        message: "Something went wrong",
                        data:
                            error instanceof Error
                                ? error.message
                                : String(error),
                    })
                );
        }
    };

    /**
     * Get a single category by ID.
     */
    show = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            const category = await CategoryModel
                .table()
                .where("id", id)
                .first();

            if (!category) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json(
                        _error({
                            message: "Category not found",
                        })
                    );
            }

            return res
                .status(STATUS.OK)
                .json(
                    _success({
                        message: "Category retrieved successfully",
                        data: category,
                    })
                );

        } catch (error) {
            return res
                .status(STATUS.INTERNAL_SERVER_ERROR)
                .json(
                    _error({
                        message: "Something went wrong",
                        data:
                            error instanceof Error
                                ? error.message
                                : String(error),
                    })
                );
        }
    };

    /**
     * Create a new category.
     *
     * Steps:
     * 1. Validate category name.
     * 2. Generate a unique slug.
     * 3. Check for duplicate slug.
     * 4. Insert the category.
     * 5. Create activity log.
     * 6. Return the newly created category.
     */
    create = async (req: Request, res: Response) => {
        try {

            const {
                parent_id,
                name,
                description,
                image,
                sort_order,
                status,
                slug
            } = req.body as Category;

            if (!name?.trim()) {
                return res
                    .status(STATUS.BAD_REQUEST)
                    .json(
                        _error({
                            message: "Category name is required",
                        })
                    );
            }
            const cleanName = name.trim();

            const existing = await CategoryModel
                .table()
                .where("slug", slug)
                .first();

            if (existing) {
                return res
                    .status(STATUS.CONFLICT)
                    .json(
                        _error({
                            message: "A category with this name already exists",
                        })
                    );
            }

            const newCategory: Category = {
                parent_id: parent_id ?? null,
                name: cleanName,
                description: description ?? null,
                image: image ?? null,
                slug,
                sort_order: sort_order ?? 0,
                status: status ?? true,
            };

            const [insertedId] = await CategoryModel
                .table()
                .insert(newCategory);

            const category = await CategoryModel
                .table()
                .where("id", insertedId)
                .first();

            /**
             * Create activity log.
             */
            await ActivityLogsModel
                .table()
                .insert({
                    action: "created",
                    subject_type: "Category",
                    subject_id: insertedId,
                    description: `Category "${cleanName}" created`,
                    new_values: JSON.stringify(category),
                });
            caseEvent.emit("case:remove", {
                section: "REACT_QUERY_OFFLINE_CACHE",
                message: "create category new item  for update your site",
                name: req.user?.name || "Admin"
            } as Case)
            return res
                .status(STATUS.CREATED)
                .json(
                    _success({
                        message: "Category created successfully",
                        data: category,
                    })
                );

        } catch (error) {
            return res
                .status(STATUS.INTERNAL_SERVER_ERROR)
                .json(
                    _error({
                        message: "Something went wrong",
                        data:
                            error instanceof Error
                                ? error.message
                                : String(error),
                    })
                );
        }
    };

    /**
     * Update an existing category.
     *
     * PATCH behavior:
     * Only fields provided by the client are updated.
     */
    update = async (req: Request<{ id?: string }, "", Category>, res: Response) => {
        try {
            const { id } = req.params;
            const category = await CategoryModel
                .table()
                .where("id", id)
                .first();

            if (!category) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json(
                        _error({
                            message: "Category not found",
                        })
                    );
            }

            const {
                parent_id,
                name,
                description,
                image,
                sort_order,
                status,
            } = req.body;

            const updateData: Partial<Category> & {
                updated_at?: Date;
            } = {};

            /**
             * Update name and regenerate slug
             * only when a new name is provided.
             */
            if (name !== undefined) {
                if (!name.trim()) {
                    return res
                        .status(STATUS.BAD_REQUEST)
                        .json(
                            _error({
                                message: "Category name cannot be empty",
                            })
                        );
                }

                const cleanName = name.trim();

                const slug = slugify(cleanName, {
                    lower: true,
                    strict: true,
                    trim: true,
                });

                if (!slug) {
                    return res
                        .status(STATUS.BAD_REQUEST)
                        .json(
                            _error({
                                message: "Unable to generate category slug",
                            })
                        );
                }

                const existing = await CategoryModel
                    .table()
                    .where("slug", slug)
                    .whereNot("id", id)
                    .first();

                if (existing) {
                    return res
                        .status(STATUS.CONFLICT)
                        .json(
                            _error({
                                message:
                                    "A category with this name already exists",
                            })
                        );
                }

                updateData.name = cleanName;
                updateData.slug = slug;
            }

            if (parent_id !== undefined) {
                updateData.parent_id = parent_id;
            }

            if (description !== undefined) {
                updateData.description = description;
            }

            if (image !== undefined) {
                updateData.image = image;
            }

            if (sort_order !== undefined) {
                updateData.sort_order = sort_order;
            }

            if (status !== undefined) {
                updateData.status = status;
            }

            updateData.updated_at = new Date();

            await CategoryModel
                .table()
                .where("id", id)
                .update(updateData);

            const updatedCategory = await CategoryModel
                .table()
                .where("id", id)
                .first();

            /**
             * Create activity log.
             */
            await ActivityLogsModel
                .table()
                .insert({
                    action: "updated",
                    subject_type: "Category",
                    subject_id: id,
                    description: `Category "${updatedCategory?.name}" updated`,
                    old_values: JSON.stringify(category),
                    new_values: JSON.stringify(updatedCategory),
                });

            return res
                .status(STATUS.OK)
                .json(
                    _success({
                        message: "Category updated successfully",
                        data: updatedCategory,
                    })
                );

        } catch (error) {
            return res
                .status(STATUS.INTERNAL_SERVER_ERROR)
                .json(
                    _error({
                        message: "Something went wrong",
                        data:
                            error instanceof Error
                                ? error.message
                                : String(error),
                    })
                );
        }
    };

    /**
     * Delete a category.
     *
     * A category should not be deleted when:
     * - It has child categories.
     * - It is already being used by products.
     */
    destroy = async (req: Request<{ id?: string }>, res: Response) => {
        try {
            const { id } = req.params;

            const category = await CategoryModel
                .table()
                .where("id", id)
                .first();

            if (!category) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json(
                        _error({
                            message: "Category not found",
                        })
                    );
            }

            /**
             * Prevent deleting a category that
             * contains child categories.
             */
            const childCategory = await CategoryModel
                .table()
                .where("parent_id", id)
                .first();

            if (childCategory) {
                return res
                    .status(STATUS.CONFLICT)
                    .json(
                        _error({
                            message:
                                "This category cannot be deleted because it contains child categories",
                        })
                    );
            }

            /**
             * Product check can be enabled when
             * ProductModel is available.
             *
             * Example:
             *
             * const product = await ProductModel
             *     .table()
             *     .where("category_id", id)
             *     .first();
             *
             * if (product) {
             *     return res
             *         .status(STATUS.CONFLICT)
             *         .json(
             *             _error({
             *                 message:
             *                     "This category cannot be deleted because products are assigned to it",
             *             })
             *         );
             * }
             */

            await CategoryModel
                .table()
                .where("id", id)
                .delete();

            /**
             * Create activity log.
             */
            await ActivityLogsModel
                .table()
                .insert({
                    action: "deleted",
                    subject_type: "Category",
                    subject_id: id,
                    description: `Category "${category.name}" deleted`,
                    old_values: JSON.stringify(category),
                });

            return res
                .status(STATUS.OK)
                .json(
                    _success({
                        message: "Category deleted successfully",
                    })
                );

        } catch (error) {
            return res
                .status(STATUS.INTERNAL_SERVER_ERROR)
                .json(
                    _error({
                        message: "Something went wrong",
                        data:
                            error instanceof Error
                                ? error.message
                                : String(error),
                    })
                );
        }
    };

})();