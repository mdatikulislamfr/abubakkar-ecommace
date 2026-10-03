import multer from "../../config/multer.js";
import bannerCache from "../cache/banner.cache.js";
import { baseModel } from "./model.js";
export class BannerModel extends baseModel {
    static tableName = "banners";
    static async cacheInitialize() {
        if (!bannerCache.isInitialized()) {
            const banner = await BannerModel.table().orderBy("sort_order", "asc");
            if (banner && banner.length > 0) {
                bannerCache.setAll(banner);
            }
        }
    }
    static responceDataModel(banners) {
        return banners.map((banner) => ({
            id: banner.id,
            title: banner.title,
            subTitle: banner.subtitle || "",
            link: banner.link || "",
            image: multer.path.public(banner.image),
            status: banner.status || 0,
            sort_order: Number(banner.sort_order || 0)
        }));
    }
}
//# sourceMappingURL=banner.model.js.map