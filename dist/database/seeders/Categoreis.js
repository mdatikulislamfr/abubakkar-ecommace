export async function seed(knex) {
    // আগের সব ডেটা মুছে ফেলা হচ্ছে
    await knex("categories").del();
    const categories = [
        // --- Main Categories ---
        {
            id: 1,
            parent_id: null,
            name: "Electronics",
            slug: "electronics",
            image: "https://upload.wikimedia.org/wikipedia/commons/d/d7/Desktop_computer_clipart_-_Yellow_theme.svg",
            sort_order: 1,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        {
            id: 2,
            parent_id: null,
            name: "Fashion",
            slug: "fashion",
            image: "https://upload.wikimedia.org/wikipedia/commons/c/c1/T-shirt_blue.svg",
            sort_order: 2,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        {
            id: 3,
            parent_id: null,
            name: "Home & Lifestyle",
            slug: "home-lifestyle",
            image: "https://upload.wikimedia.org/wikipedia/commons/1/1b/Creative-Tail-house.svg",
            sort_order: 3,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        {
            id: 4,
            parent_id: null,
            name: "Groceries",
            slug: "groceries",
            image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Orange_icon.svg", // অরেঞ্জ আইকন
            sort_order: 4,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        // --- Sub Categories ---
        // Electronics এর আন্ডারে (parent_id: 1)
        {
            id: 5,
            parent_id: 1,
            name: "Smartphones",
            slug: "smartphones",
            image: "https://upload.wikimedia.org/wikipedia/commons/b/b4/Smartphone_icon_-_Nokia_N9.svg",
            sort_order: 1,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        {
            id: 6,
            parent_id: 1,
            name: "Laptops",
            slug: "laptops",
            image: "https://upload.wikimedia.org/wikipedia/commons/0/0c/Laptop-icon.svg",
            sort_order: 2,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        // Fashion এর আন্ডারে (parent_id: 2)
        {
            id: 7,
            parent_id: 2,
            name: "Men's Clothing",
            slug: "mens-clothing",
            image: "https://upload.wikimedia.org/wikipedia/commons/6/69/Man_Silhouette.svg", // ম্যান সিল্যুয়েট 
            sort_order: 1,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        {
            id: 8,
            parent_id: 2,
            name: "Women's Clothing",
            slug: "womens-clothing",
            image: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Woman_Silhouette.svg", // ওম্যান সিল্যুয়েট
            sort_order: 2,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        // Home & Lifestyle এর আন্ডারে (parent_id: 3)
        {
            id: 9,
            parent_id: 3,
            name: "Furniture",
            slug: "furniture",
            image: "https://upload.wikimedia.org/wikipedia/commons/4/41/Sofa_icon.svg", // সোফা আইকন
            sort_order: 1,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        },
        // Groceries এর আন্ডারে (parent_id: 4)
        {
            id: 10,
            parent_id: 4,
            name: "Fresh Fruits",
            slug: "fresh-fruits",
            image: "https://upload.wikimedia.org/wikipedia/commons/f/f4/Apple_icon_1.png", // অ্যাপেল আইকন
            sort_order: 1,
            status: true,
            created_at: new Date(),
            updated_at: new Date(),
            deleted_at: null
        }
    ];
    await knex("categories").insert(categories);
}
//# sourceMappingURL=Categoreis.js.map