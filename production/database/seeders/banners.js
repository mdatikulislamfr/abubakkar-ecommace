export async function seed(knex) {
    // আগের সব ডেটা মুছে ফেলা হচ্ছে
    await knex("banners").del();
    const banners = [
        {
            id: 1,
            title: "শীতের মেগা সেল",
            subtitle: "শীতের পোশাকে ৫০% পর্যন্ত বিশেষ ছাড়",
            image: "https://placehold.co/1200x400/0f766e/ffffff?text=Winter+Mega+Sale",
            link: "/campaign/winter-sale",
            sort_order: 1,
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 2,
            title: "ফ্ল্যাশ সেল",
            subtitle: "নির্বাচিত পণ্যে সীমিত সময়ের বিশেষ অফার",
            image: "https://placehold.co/1200x400/dc2626/ffffff?text=Flash+Sale",
            link: "/campaign/flash-sale",
            sort_order: 2,
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 3,
            title: "নতুন কালেকশন",
            subtitle: "আপনার পছন্দের নতুন পণ্য এখন একসাথে",
            image: "https://placehold.co/1200x400/7c3aed/ffffff?text=New+Collection",
            link: "/products?sort=newest",
            sort_order: 3,
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 4,
            title: "সারা বাংলাদেশে ডেলিভারি",
            subtitle: "সহজ অর্ডার, নিরাপদ পেমেন্ট এবং দ্রুত ডেলিভারি",
            image: "https://placehold.co/1200x400/2563eb/ffffff?text=Fast+Delivery",
            link: "/shipping-policy",
            sort_order: 4,
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            id: 5,
            title: "বিশেষ অফার",
            subtitle: "আজকের নির্বাচিত পণ্যগুলোতে আকর্ষণীয় ছাড়",
            image: "https://placehold.co/1200x400/d97706/ffffff?text=Special+Offer",
            link: "/campaign/special-offer",
            sort_order: 5,
            status: 1,
            created_at: new Date(),
            updated_at: new Date()
        }
    ];
    await knex("banners").insert(banners);
}
//# sourceMappingURL=banners.js.map