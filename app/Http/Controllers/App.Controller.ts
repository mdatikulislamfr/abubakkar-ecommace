import { Request, Response } from "express";
import Controller from "./Controller.js";
import { AppModel } from "../../Models/app.model.js";
import status from "../../../config/status.js";
import { _error, _success } from "../../helpers/appHelper.js";
import { ActivityLogsModel } from "../../Models/activity_logs.model.js";
import appCache from "../../cache/app.cache.js";
import STATUS from "../../../config/status.js";


export default new class AppController extends Controller {
    index = async (_: Request, res: Response) => {
        try {
            if (appCache.size() == 0) {
                await AppModel.cachingOnModel();
            }
            const app = appCache.get(0);
            if (!app) {
                return res.status(status.NOT_FOUND).json(_error({ message: "App data not found" }));
            }
            const datas = {
                name: app.name || "",
                title: app.title || "",
                delivary: {
                    insite: app.insite_dhaka || 60,
                    ousite: app.outsite_dhaka || 120,
                },
                contact: {
                    email: app.email || "",
                    location: app.location || "",
                    phone: app.phone || "",
                },
                facebook: app.facebook || "",
                linkdin: app.linkdin || "",
                logo: app.logo || "",
                messager: app.messager || "",
                youtube: app.youtube || "",
            }
            return res.status(200).json(this._success("Welcome to the E-commerce API", datas));
        } catch (e) {
            return res.status(500).json(this._error(e instanceof Error ? e.message : "some error"));
        }
    }
    appset = async (req: Request, res: Response) => {
        try {
            const data = req.body;
            const app = await AppModel
                .table()
                .first();
            if (!app) {

                await AppModel
                    .table()
                    .insert(data);

                return res
                    .status(status.OK)
                    .json(
                        _success({
                            message: "App data set successfully",
                        })
                    );
            }

            await AppModel
                .table()
                .where("id", app.id)
                .update({
                    ...data,
                    updated_at: new Date(),
                });
            await AppModel.cachingOnModel();
            const updatedApp = appCache.get(0);

            /**
             * Create activity log.
             *
             * Stores:
             * - Who updated the app settings
             * - Old app data
             * - New app data
             * - IP address
             * - User agent
             */
            await ActivityLogsModel
                .table()
                .insert({
                    user_id: req.user?.id ?? null,
                    action: "updated",
                    subject_type: "App",
                    subject_id: Number(app.id),
                    description: "App settings updated successfully",
                    old_values: JSON.stringify(app),
                    new_values: JSON.stringify(updatedApp),
                    ip_address: req.ip,
                    user_agent: req.get("user-agent") ?? null,
                });
            return res
                .status(status.OK)
                .json(
                    _success({
                        message: "App settings updated successfully",
                        data: updatedApp,
                    })
                );

        } catch (error) {
            return res
                .status(status.INTERNAL_SERVER_ERROR)
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
    bannaer = (_: Request, res: Response) => {
        try {
            const datas = [
                {
                    "tag": "প্রিমিয়াম কালেকশন",
                    "title": "সময়ের সাথে স্টাইলও হোক নিখুঁত",
                    "subtitle": "আপনার ব্যক্তিত্বের সাথে মানানসই প্রিমিয়াম হাতঘড়ির সেরা কালেকশন।",
                    "cta": "কালেকশন দেখুন",
                    "href": "#",
                    "img": "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=1600&q=80"
                },
                {
                    "tag": "মেনস কালেকশন",
                    "title": "আপনার সময়, আপনার স্টাইল",
                    "subtitle": "ক্লাসিক থেকে আধুনিক—প্রতিটি মুহূর্তের জন্য বেছে নিন আপনার পছন্দের ঘড়ি।",
                    "cta": "ঘড়ি দেখুন",
                    "href": "#",
                    "img": "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1600&q=80"
                },
                {
                    "tag": "ক্লাসিক স্টাইল",
                    "title": "সিম্পল লুক, অসাধারণ ব্যক্তিত্ব",
                    "subtitle": "মার্জিত ডিজাইন ও timeless স্টাইলের হাতঘড়ি আপনার প্রতিদিনের লুককে করবে আরও আকর্ষণীয়।",
                    "cta": "এখনই কিনুন",
                    "href": "#",
                    "img": "https://images.unsplash.com/photo-1539874754764-5a96559165b0?w=1600&q=80"
                },
                {
                    "tag": "লাক্সারি কালেকশন",
                    "title": "যারা সেরাটাই বেছে নেন",
                    "subtitle": "প্রিমিয়াম ফিনিশ ও আকর্ষণীয় ডিজাইনের লাক্সারি ঘড়িতে ফুটিয়ে তুলুন আপনার রুচি।",
                    "cta": "লাক্সারি ঘড়ি",
                    "href": "#",
                    "img": "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=1600&q=80"
                },
                {
                    "tag": "নতুন আগমন",
                    "title": "নতুন সময়ের সাথে নতুন লুক",
                    "subtitle": "নতুন ডিজাইনের ট্রেন্ডি হাতঘড়ির কালেকশন এখন Family Shop-এ।",
                    "cta": "নতুন কালেকশন",
                    "href": "#",
                    "img": "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?w=1600&q=80"
                }
            ]
            return res._success(STATUS.OK, "Banner list", datas);
        } catch (e) {
            return res._error(STATUS.INTERNAL_SERVER_ERROR, (e as Error).message || "some error");
        }
    }
    update = () => {

    }

}