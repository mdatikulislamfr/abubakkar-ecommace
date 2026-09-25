import http from "http";
import app from "./app.js";
import { AppModel } from "../app/Models/app.model.js";
import { BrandModel } from "../app/Models/brand.model.js";
import { CategoryModel } from "../app/Models/categorys.model.js";
import { ProductModel } from "../app/Models/products.model.js";
import { BannerModel } from "../app/Models/banner.model.js";
import { ProductImagesModel } from "../app/Models/products_iamges.model.js";
const PORT = Number(process.env.PORT) || 4000;
const server = http.createServer(app);
const startServer = async () => {
    try {
        const resuld = await Promise.allSettled([
            AppModel.cacheInitialize(), //working
            BrandModel.cacheInitialize(),
            CategoryModel.cacheInitialize(),
            BannerModel.cacheInitialize(),
            ProductImagesModel.cacheInitialize(),
            ProductModel.cacheInitialize(),
        ]);
        const feild = resuld.filter(res => res.status === "rejected");
        console.log(`${resuld.length - feild.length} Caches initialized successfully!`);
        server.listen(PORT, () => {
            console.log(`\n🚀 Server running successfully\n` +
                `   ➜ Local: http://localhost:${PORT}\n` +
                // `   ➜ Socket: ws://localhost:${PORT}\n` +
                `   ➜ Mode : ${process.env.NODE_ENV || "development"}\n`);
        });
    }
    catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
//# sourceMappingURL=server.js.map