import { Request, Response } from "express";
import slugify from "slugify";

import { Req, Res } from "../../../@types/index.js";
import { Brand } from "../../../@types/table.js";

import Controller from "./Controller.js";
import { _error, _success } from "../../helpers/appHelper.js";
import STATUS from "../../../config/status.js";
import { BrandModel } from "../../Models/brand.model.js";
import { ActivityLogsModel } from "../../Models/activity_logs.model.js";

export default new (class BrandController extends Controller {

    /**
     * Get all brands.
     *
     * Supports:
     * - Pagination
     * - Search by brand name
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

            const query = BrandModel.table();

            if (search) {
                query.where("name", "like", `%${search}%`);
            }

            // const [{ total }] = await query
            //     .clone()
            //     .clearSelect()
            //     .clearOrder()
            //     .count<{ total: number }>("id as total");

            const brands = await query
                .select("*")
                .whereNull("deleted_at")
                .orderBy("sort_order", "asc")
                .orderBy("id", "desc")
                .limit(limit)
                .offset(offset);

            return res
                .status(STATUS.OK)
                .json(
                    _success({
                        message: "Brands retrieved successfully",
                        data: brands,
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
     * Get a single brand by ID.
     */
    show = async (req: Req<{ id: string }>, res: Response) => {
        try {
            const { id } = req.params;

            const brand = await BrandModel
                .table()
                .where("id", id)
                .whereNull("deleted_at")
                .first();

            if (!brand) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json(
                        _error({
                            message: "Brand not found",
                        })
                    );
            }

            return res
                .status(STATUS.OK)
                .json(
                    _success({
                        message: "Brand retrieved successfully",
                        data: brand,
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
     * Create a new brand.
     *
     * Steps:
     * 1. Validate brand name.
     * 2. Generate a unique slug.
     * 3. Check for duplicate slug.
     * 4. Insert the brand.
     * 5. Create activity log.
     * 6. Return the newly created brand.
     */
    create = async (req: Req<Brand>, res: Res) => {
        try {
            const {
                name,
                code,
                description,
                logo,
                website,
                sort_order,
                status,
            } = req.body;

            if (
                !name?.trim() ||
                !description?.trim() ||
                !website ||
                !code ||
                !logo ||
                !sort_order ||
                !status
            ) {
                return res
                    .status(STATUS.BAD_REQUEST)
                    .json(
                        _error({
                            message:
                                "Brand name, description, website is required",
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
                            message: "Unable to generate brand slug",
                        })
                    );
            }

            const existing = await BrandModel
                .table()
                .where("slug", slug)
                .first();

            if (existing) {
                return res
                    .status(STATUS.CONFLICT)
                    .json(
                        _error({
                            message: "A brand with this name already exists",
                        })
                    );
            }

            const newBrand: Brand = {
                name: cleanName,
                slug,
                code: code ?? null,
                description: description ?? null,
                logo: logo ?? null,
                website,
                sort_order: sort_order ?? 0,
                status: status ?? true,
            };

            const [insertedId] = await BrandModel
                .table()
                .insert(newBrand);

            const brand = await BrandModel
                .table()
                .where("id", insertedId)
                .first();

            /**
             * Create activity log.
             */
            await ActivityLogsModel
                .table()
                .insert({
                    user_id: req.user?.id ?? null,
                    action: "created",
                    subject_type: "Brand",
                    subject_id: insertedId,
                    description: `Brand "${cleanName}" created successfully`,
                    old_values: null,
                    new_values: JSON.stringify(brand),
                    ip_address: req.ip,
                    user_agent: req.get("user-agent") ?? null,
                });

            return res
                .status(STATUS.CREATED)
                .json(
                    _success({
                        message: "Brand created successfully",
                        data: brand,
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
     * Update an existing brand.
     *
     * PATCH behavior:
     * Only fields provided by the client are updated.
     */
    update = async (req: Req<Brand>, res: Res) => {
        try {
            const { id } = req.params;

            const brand = await BrandModel
                .table()
                .where("id", id)
                .whereNull("deleted_at")
                .first();

            if (!brand) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json(
                        _error({
                            message: "Brand not found",
                        })
                    );
            }

            const {
                name,
                code,
                description,
                logo,
                website,
                sort_order,
                status,
            } = req.body;

            const updateData: Partial<Brand> & {
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
                                message: "Brand name cannot be empty",
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
                                message: "Unable to generate brand slug",
                            })
                        );
                }

                const existing = await BrandModel
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
                                    "A brand with this name already exists",
                            })
                        );
                }

                updateData.name = cleanName;
                updateData.slug = slug;
            }

            if (code !== undefined) {
                updateData.code = code;
            }

            if (description !== undefined) {
                updateData.description = description;
            }

            if (logo !== undefined) {
                updateData.logo = logo;
            }

            if (website !== undefined) {
                updateData.website = website;
            }

            if (sort_order !== undefined) {
                updateData.sort_order = sort_order;
            }

            if (status !== undefined) {
                updateData.status = status;
            }

            updateData.updated_at = new Date();

            await BrandModel
                .table()
                .where("id", id)
                .update(updateData);

            const updatedBrand = await BrandModel
                .table()
                .where("id", id)
                .first();

            /**
             * Create activity log.
             */
            await ActivityLogsModel
                .table()
                .insert({
                    user_id: req.user?.id ?? null,
                    action: "updated",
                    subject_type: "Brand",
                    subject_id: id,
                    description: `Brand "${updatedBrand?.name}" updated successfully`,
                    old_values: JSON.stringify(brand),
                    new_values: JSON.stringify(updatedBrand),
                    ip_address: req.ip,
                    user_agent: req.get("user-agent") ?? null,
                });

            return res
                .status(STATUS.OK)
                .json(
                    _success({
                        message: "Brand updated successfully",
                        data: updatedBrand,
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
     * Delete a brand.
     *
     * A brand should not be deleted when:
     * - It is already being used by products.
     */
    destroy = async (req: Req<{ id: string }>, res: Response) => {
        try {
            const { id } = req.params;

            const brand = await BrandModel
                .table()
                .where("id", id)
                .whereNull("deleted_at")
                .first();

            if (!brand) {
                return res
                    .status(STATUS.NOT_FOUND)
                    .json(
                        _error({
                            message: "Brand not found",
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
             *     .where("brand_id", id)
             *     .first();
             *
             * if (product) {
             *     return res
             *         .status(STATUS.CONFLICT)
             *         .json(
             *             _error({
             *                 message:
             *                     "This brand cannot be deleted because products are assigned to it",
             *             })
             *         );
             * }
             */

            await BrandModel
                .table()
                .where("id", id)
                .update({
                    deleted_at: new Date(),
                    updated_at: new Date(),
                });

            /**
             * Create activity log.
             */
            await ActivityLogsModel
                .table()
                .insert({
                    user_id: req.user?.id ?? null,
                    action: "deleted",
                    subject_type: "Brand",
                    subject_id: id,
                    description: `Brand "${brand.name}" deleted successfully`,
                    old_values: JSON.stringify(brand),
                    new_values: null,
                    ip_address: req.ip,
                    user_agent: req.get("user-agent") ?? null,
                });

            return res
                .status(STATUS.OK)
                .json(
                    _success({
                        message: "Brand deleted successfully",
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