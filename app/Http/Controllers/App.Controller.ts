import { Request, Response } from "express";
import Controller from "./Controller.js";
import { AppModel } from "../../Models/app.model.js";
import status from "../../../config/status.js";
import { _error, _success } from "../../helpers/appHelper.js";
import { App } from "../../../@types/table.js";
import { BannerModel } from "../../Models/banner.model.js";
import { Req } from "../../../@types/index.js";
import { ActivityLogsModel } from "../../Models/activity_logs.model.js";


export default new class AppController extends Controller {
    index = async (_: Request, res: Response) => {
        try {
            const app = await AppModel.table().first() as App;
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
    appset = async (req: Req<App>, res: Response) => {
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

            const updatedApp = await AppModel
                .table()
                .where("id", app.id)
                .first();

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
    bannaer = (req, res) => {
        try {
            const datas = [
                {
                    tag: "নতুন কালেকশন",
                    title: "স্টাইল বদলান, প্রতিদিন",
                    subtitle: "সেরা ব্র্যান্ডের ফ্যাশন এখন এক জায়গায়। ৫০% পর্যন্ত ছাড়।",
                    cta: "কিনতে যান",
                    href: "/category/fashion",
                    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&q=80",
                },
                {
                    tag: "লেটেস্ট গ্যাজেট",
                    title: "টেকনোলজির নতুন দিগন্ত",
                    subtitle: "প্রিমিয়াম স্মার্টফোন, ল্যাপটপ, অ্যাক্সেসরিজ।",
                    cta: "এখনই দেখুন",
                    href: "/category/electronics",
                    img: "https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1600&q=80",
                },
                {
                    tag: "হোম এসেনশিয়ালস",
                    title: "ঘরকে দিন নতুন রূপ",
                    subtitle: "কিচেন, হোম ডেকর ও ঘরের সব দরকারি পণ্য।",
                    cta: "শপ নাউ",
                    href: "/category/home-kitchen",
                    img: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80",
                },
            ]
            return res.status(200).json(this._success("Banner list", datas));
        } catch (e) {
            res.status(500).json(this._error("some error", { error: e.message }));
        }
    }
    update = () => {

    }

}