import { Knex } from "knex";
import { ProductImage } from "../../@types/table.js";

export async function seed(knex: Knex): Promise<void> {
    // আগের সব ডেটা মুছে ফেলা হচ্ছে
    await knex("product_images").del();

    // const validImageSources = [
    //     "https://upload.wikimedia.org/wikipedia/commons/b/b4/Smartphone_icon_-_Nokia_N9.svg", // Smartphone
    //     "https://upload.wikimedia.org/wikipedia/commons/0/0c/Laptop-icon.svg", // Laptop
    //     "https://upload.wikimedia.org/wikipedia/commons/c/c1/T-shirt_blue.svg", // T-shirt
    //     "https://upload.wikimedia.org/wikipedia/commons/4/41/Sofa_icon.svg", // Sofa
    //     "https://upload.wikimedia.org/wikipedia/commons/5/5e/Running_shoe_icon.svg", // Shoe
    //     "https://upload.wikimedia.org/wikipedia/commons/a/a2/Watch_icon.svg", // Watch
    //     "https://upload.wikimedia.org/wikipedia/commons/4/44/Camera_icon.svg", // Camera
    //     "https://upload.wikimedia.org/wikipedia/commons/9/91/Headphones_icon.svg", // Headphone
    //     "https://upload.wikimedia.org/wikipedia/commons/b/b5/Book_icon.svg", // Book
    //     "https://upload.wikimedia.org/wikipedia/commons/f/f4/Apple_icon_1.png" // Apple (Grocery)
    // ];

    const images: ProductImage[] = [];
    // let imageIdCounter = 1;
    // for (let productId = 1; productId <= 20; productId++) {
    //     const imageBaseUrl = validImageSources[productId % validImageSources.length];

    //     for (let sortOrder = 1; sortOrder <= 3; sortOrder++) {
    //         images.push({
    //             id: imageIdCounter++,
    //             product_id: productId,
    //             image: imageBaseUrl,
    //             sort_order: sortOrder,
    //             is_primary: sortOrder === 1,
    //             status: true,
    //             created_at: new Date(),
    //             updated_at: new Date(),
    //             deleted_at: null
    //         });
    //     }
    // }

    await knex("product_images").insert(images);
}