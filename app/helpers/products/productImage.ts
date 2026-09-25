import { ProductImage } from "../../../@types/table.js";
import { ProductImagesModel } from "../../Models/products_iamges.model.js";

export async function createImages(images: ProductImage): Promise<void> {
    try {
        const [insertId] = await ProductImagesModel.table().insert(images);
        return await ProductImagesModel.find(insertId);
    } catch (error) {
        throw (error instanceof Error ? error.message : String(error));
    }
}