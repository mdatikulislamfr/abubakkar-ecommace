import slugify from "slugify";
import Controller from "./Controller.js";
import { empty } from "../../helpers/appHelper.js";
import STATUS from "../../../config/status.js";
import { BrandModel } from "../../Models/brand.model.js";
import brandCache from "../../cache/brand.cache.js";
import path from "path";
import { Worker } from "worker_threads";
import multer from "../../../config/multer.js";
const workerPath = path.join(process.cwd(), 'app/Worker/imageWorker.js');
export default new class BrandController extends Controller {
    index = async (req, res) => {
        try {
            const { id } = req.params;
            const data = id ? [brandCache.get(Number(id))] : brandCache.getAll();
            if (data.length == 0)
                return res._error(STATUS.NOT_FOUND, "data not found");
            const send = BrandModel.clientresponce((data || []));
            return res._success(STATUS.OK, "Successfull", send);
        }
        catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, e instanceof Error ? e.message : "some error");
        }
    };
    create = async (req, res) => {
        try {
            const { name, website, sort_order, status, slug } = req.body;
            if (empty(name) || empty(slug)) {
                return res._error(STATUS.BAD_REQUEST, "Brand name and slug are required");
            }
            const cleanName = name.trim();
            const cleanSlug = slugify(slug.trim(), { lower: true, trim: true });
            const existing = await BrandModel.table().where("slug", cleanSlug).first();
            if (existing) {
                return res._error(STATUS.CONFLICT, "A brand with this slug already exists");
            }
            const newBrandData = {
                name: cleanName,
                slug: cleanSlug,
                website: website || null,
                sort_order: sort_order ?? 0,
                status: status ?? true,
            };
            const [insertId] = await BrandModel.table().insert(newBrandData);
            if (!insertId) {
                return res._error(STATUS.INTERNAL_SERVER_ERROR, " Failed to create brand");
            }
            const brand = await BrandModel.find(insertId);
            brandCache.set(brand);
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
                        await BrandModel.table().where({ id: insertId }).update({ logo: result.name });
                        const sliderx = await BrandModel.find(insertId);
                        sliderx.image = result.name;
                        brandCache.set(sliderx);
                    }
                });
            }
            const send = BrandModel.clientresponce([brand]);
            return res._success(STATUS.CREATED, " Brand created successfully", send);
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
            const brand = await BrandModel.find(Number(id));
            if (!brand) {
                return res._error(STATUS.NOT_FOUND, "Brand not found");
            }
            const { name, website, sort_order, status } = req.body;
            const updateData = {};
            if (!empty(name)) {
                const cleanName = name.trim();
                const cleanSlug = slugify(cleanName, { lower: true, trim: true });
                const existing = await BrandModel.table()
                    .where("slug", cleanSlug)
                    .whereNot("id", id)
                    .first();
                if (existing) {
                    return res._error(STATUS.CONFLICT, "A brand with this slug already exists");
                }
                updateData.name = cleanName;
                updateData.slug = cleanSlug;
            }
            if (website !== undefined)
                updateData.website = website || null;
            if (sort_order !== undefined)
                updateData.sort_order = Number(sort_order);
            if (status !== undefined)
                updateData.status = status;
            updateData.updated_at = new Date();
            await BrandModel.table().where("id", id).update(updateData);
            const updatedBrand = await BrandModel.find(Number(id));
            if (!updatedBrand) {
                return res._error(STATUS.NOT_FOUND, "Updated brand not found");
            }
            brandCache.set(updatedBrand);
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
                        await BrandModel.table().where({ id: id }).update({ logo: result.name });
                        const sliderx = await BrandModel.find(Number(id));
                        sliderx.logo = result.name;
                        brandCache.set(sliderx);
                    }
                });
            }
            const send = BrandModel.clientresponce([updatedBrand]);
            return res._success(STATUS.OK, "Brand updated successfully", send);
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
            const brand = await BrandModel.find(Number(id));
            if (!brand) {
                return res._error(STATUS.NOT_FOUND, "Brand not found");
            }
            await BrandModel.table().where("id", id).update({
                deleted_at: new Date(),
                updated_at: new Date(),
            });
            brandCache.delete(Number(id));
            return res._success(STATUS.OK, "Brand deleted successfully", null);
        }
        catch (error) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, error instanceof Error ? error.message : String(error));
        }
    };
};
//# sourceMappingURL=Brand.Controller.js.map