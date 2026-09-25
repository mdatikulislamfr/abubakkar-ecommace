import { Request, Response } from "express";
import Controller from "./Controller.js";
import { AppModel } from "../../Models/app.model.js";
import appCache from "../../cache/app.cache.js";
import STATUS from "../../../config/status.js";
import { App, Banner } from "../../../@types/table.js";
import { BannerModel } from "../../Models/banner.model.js";
import bannerCache from "../../cache/banner.cache.js";
import { empty } from "../../helpers/appHelper.js";
import path from "path";
import { Worker } from "worker_threads";
import multer from "../../../config/multer.js";
const workerPath = path.join(process.cwd(), 'app/Worker/imageWorker.js');
export default new class AppController extends Controller {
    index = async (_: Request, res: Response) => {
        try {
            const app = appCache.getAll();
            if (!app) return res._error(STATUS.NOT_FOUND, "App data not found", AppModel.emptydata);
            const datas = AppModel.responceDataModel(app[0]);
            return res._success(STATUS.OK, "Welcome to the E-commerce API", datas);
        } catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, e instanceof Error ? e.message : "some error");
        }
    }
    set = async (req: Request, res: Response) => {
        try {

            const app = req.body as App;
            if (Object.keys(app).length == 0) return res._error(STATUS.BAD_REQUEST, "app all data empty!");
            let idx = null;
            if (appCache.getAll().length > 0) {
                const id = appCache.getAll()[0].id;
                await AppModel.set(app);
                idx = id;
            } else {
                const [insertId] = await AppModel.table().insert({ ...app, logo: "logo.webp" });
                idx = insertId;
            }
            const appdata = await AppModel.find(idx);
            appCache.set(appdata);



            // imaeg upload
            const file = req.file;
            if (file) {
                new Worker(workerPath, {
                    workerData: {
                        inputPath: req.file?.buffer,
                        fileName: "logo",
                        label: false,
                        size: 512,
                        outputPath: multer.path.upload()
                    }
                })
            }

            const send = AppModel.responceDataModel(appCache.getAll()[0]);
            if (!app) return res._error(STATUS.NOT_FOUND, "App data not found");
            return res._success(STATUS.OK, "Successfull", send);
        } catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, e instanceof Error ? e.message : "some error");
        }
    }
    bannaerget = async (_: Request, res: Response) => {
        try {
            const banners = bannerCache.getAll();
            if (banners.length == 0) return res._error(STATUS.NOT_FOUND, "banner not found");
            const datas = BannerModel.responceDataModel(banners);
            return res._success(STATUS.OK, "Welcome to the E-commerce API", datas);
        } catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, e instanceof Error ? e.message : "some error");
        }
    }
    bannaeradd = async (req: Request, res: Response) => {
        try {
            const banner = req.body as Banner;
            if (empty(banner.title) || empty(banner.subtitle) || empty(banner.sort_order)) {
                return res._error(STATUS.BAD_REQUEST, "data input empty");
            }
            const [insertId] = await BannerModel.table().insert(banner);
            const slider = await BannerModel.find(insertId);
            const send = BannerModel.responceDataModel([slider]);
            // imaeg upload
            const file = req.file;
            if (file) {
                const imageProcessing = new Worker(workerPath, {
                    workerData: {
                        inputPath: req.file?.buffer,
                        label: true,
                        outputPath: multer.path.upload()
                    }
                })
                imageProcessing.on('message', async (result) => {
                    if (result.success) {
                        await BannerModel.table().where({ id: insertId }).update({ image: result.name })
                        const sliderx = await BannerModel.find(insertId);
                        sliderx.image = result.name;
                        bannerCache.set(sliderx);
                    }
                });
            }
            bannerCache.set(slider);
            return res._success(STATUS.OK, "banner create succssfull", send);
        } catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, (e as Error).message || "some error");
        }
    }
    update = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const banner = req.body as Banner;
            console.log(bannerCache.getAll());
            if (!bannerCache.has(Number(id))) return res._error(STATUS.NOT_FOUND, "banner not found");

            if (empty(banner.title) || empty(banner.subtitle || "") || empty(banner.status || 1) || empty(banner.sort_order)) {
                return res._error(STATUS.BAD_REQUEST, "data input empty");
            }
            await BannerModel.table().where("id", "=", id).update(banner);
            const bannerItem = await BannerModel.find(Number(id)) as Banner;
            const send = BannerModel.responceDataModel([bannerItem]);
            bannerCache.set(bannerItem);
            const file = req.file;
            if (file) {
                const imageProcessing = new Worker(workerPath, {
                    workerData: {
                        inputPath: req.file?.buffer,
                        label: true,
                        outputPath: multer.path.upload()
                    }
                })
                imageProcessing.on('message', async (result) => {
                    if (result.success) {
                        multer.path.unlink(bannerItem.image)
                        await BannerModel.table().where({ id: id }).update({ image: result.name })
                        const sliderx = await BannerModel.find(Number(id));
                        sliderx.image = result.name;
                        bannerCache.set(sliderx);
                    }
                });
            }
            return res._success(STATUS.OK, "banner update successfull", send);
        } catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, (e as Error).message || "some error");
        }
    }
    remove = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const banner = bannerCache.get(Number(id));
            if (!banner) return res._error(STATUS.NOT_FOUND, "banner not found");
            multer.path.unlink(banner?.image || "")
            await BannerModel.table().del(id);
            bannerCache.delete(Number(id));
            return res._success(STATUS.OK, "banner remove successfull");
        } catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, (e as Error).message || "some error");
        }
    }

}