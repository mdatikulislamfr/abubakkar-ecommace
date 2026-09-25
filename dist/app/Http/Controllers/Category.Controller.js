import slugify from "slugify";
import Controller from "./Controller.js";
import { CategoryModel } from "../../Models/categorys.model.js";
import { empty } from "../../helpers/appHelper.js";
import STATUS from "../../../config/status.js";
import categoryCache from "../../cache/category.cache.js";
import path from "path";
import { Worker } from "worker_threads";
import multer from "../../../config/multer.js";
const workerPath = path.join(process.cwd(), 'app/Worker/imageWorker.ts');
export default new class CategoryController extends Controller {
    index = async (req, res) => {
        try {
            const id = req.params.id;
            const categories = id ? [categoryCache.get(Number(id))] : categoryCache.getAll();
            if (!categories || categories.length == 0)
                return res._error(STATUS.NOT_FOUND, "category not found");
            const sned = CategoryModel.clientresponce((categories || []));
            return res._success(STATUS.OK, "Categories retrieved successfully", sned);
        }
        catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, e instanceof Error ? e.message : "Some error occurred");
        }
    };
    create = async (req, res) => {
        try {
            const { parent_id, name, sort_order, status, slug, } = req.body;
            if (empty(name) || empty(slug)) {
                return res._error(STATUS.BAD_REQUEST, "Category name and slug are required");
            }
            const cleanName = name.trim();
            const cleanSlug = slugify(slug.trim(), { lower: true, trim: true });
            const existing = await CategoryModel.table()
                .where("slug", cleanSlug)
                .first();
            if (existing) {
                return res._error(STATUS.CONFLICT, "A category with this slug already exists");
            }
            const newCategoryData = {
                parent_id: parent_id ?? null,
                name: cleanName,
                slug: cleanSlug,
                sort_order: sort_order ?? 0,
                status: status ?? true,
            };
            const [insertId] = await CategoryModel.table().insert(newCategoryData);
            if (!insertId) {
                return res._error(STATUS.INTERNAL_SERVER_ERROR, "Failed to create category");
            }
            const category = await CategoryModel.find(insertId);
            if (category) {
                categoryCache.set(category);
            }
            // file upload
            const file = req.file;
            if (file) {
                const imageProcessing = new Worker(workerPath, {
                    workerData: {
                        inputPath: req.file?.buffer,
                        label: true,
                        outputPath: multer.path.upload()
                    }
                });
                imageProcessing.on('message', async (result) => {
                    if (result.success) {
                        await CategoryModel.table().where({ id: insertId }).update({ image: result.name });
                        const sliderx = await CategoryModel.find(insertId);
                        sliderx.image = result.name;
                        categoryCache.set(sliderx);
                    }
                });
            }
            return res._success(STATUS.CREATED, "Category created successfully", category);
        }
        catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : String(error));
        }
    };
    update = async (req, res) => {
        try {
            const { id } = req.params;
            if (empty(id)) {
                return res._error(STATUS.BAD_REQUEST, "ID is required");
            }
            const category = await CategoryModel.find(Number(id));
            if (!category) {
                return res._error(STATUS.NOT_FOUND, "Category not found");
            }
            const { parent_id, name, image, sort_order, status, } = req.body;
            const updateData = {};
            if (!empty(name)) {
                const cleanName = name.trim();
                const cleanSlug = slugify(cleanName, { lower: true, trim: true });
                const existing = await CategoryModel.table()
                    .where("slug", cleanSlug)
                    .whereNot("id", id)
                    .first();
                if (existing) {
                    return res._error(STATUS.CONFLICT, "A category with this slug already exists");
                }
                updateData.name = cleanName;
                updateData.slug = cleanSlug;
            }
            if (parent_id !== undefined)
                updateData.parent_id = parent_id || null;
            if (image !== undefined)
                updateData.image = image || null;
            if (sort_order !== undefined)
                updateData.sort_order = Number(sort_order);
            if (status !== undefined)
                updateData.status = status;
            updateData.updated_at = new Date();
            await CategoryModel.table().where("id", id).update(updateData);
            const updatedCategory = await CategoryModel.find(Number(id));
            if (!updatedCategory) {
                return res._error(STATUS.NOT_FOUND, "Updated category not found");
            }
            categoryCache.set(updatedCategory);
            const file = req.file;
            if (file) {
                const imageProcessing = new Worker(workerPath, {
                    workerData: {
                        inputPath: req.file?.buffer,
                        label: true,
                        outputPath: multer.path.upload()
                    }
                });
                imageProcessing.on('message', async (result) => {
                    if (result.success) {
                        await CategoryModel.table().where({ id: id }).update({ image: result.name });
                        const sliderx = await CategoryModel.find(Number(id));
                        sliderx.image = result.name;
                        categoryCache.set(sliderx);
                    }
                });
            }
            return res._success(STATUS.OK, "Category updated successfully", updatedCategory);
        }
        catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : String(error));
        }
    };
    destroy = async (req, res) => {
        try {
            const { id } = req.params;
            if (empty(id)) {
                return res._error(STATUS.BAD_REQUEST, "ID is required");
            }
            const category = await CategoryModel.find(Number(id));
            if (!category) {
                return res._error(STATUS.NOT_FOUND, "Category not found");
            }
            // Check if category has child categories
            const childCategory = await CategoryModel.table()
                .where("parent_id", id)
                .whereNull("deleted_at")
                .first();
            if (childCategory) {
                return res._error(STATUS.CONFLICT, "This category cannot be deleted because it contains child categories");
            }
            // Soft delete
            await CategoryModel.table().where("id", id).update({
                deleted_at: new Date(),
                updated_at: new Date(),
            });
            categoryCache.delete(Number(id));
            return res._success(STATUS.OK, "Category deleted successfully", null);
        }
        catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : String(error));
        }
    };
};
//# sourceMappingURL=Category.Controller.js.map