import Controller from "./Controller.js";


export default new class ProductController extends Controller {
    products = [
        {
            id: 1,
            slug: "smartphone-x-pro",
            name: "স্মার্টফোন এক্স প্রো",
            description: "প্রিমিয়াম মানের পণ্য, সেরা দামে।",
            specification: [
                "৫জি সাপোর্ট",
                "১২৮ গিগাবাইট স্টোরেজ",
                "৬৪ মেগাপিক্সেল ক্যামেরা"
            ],
            price: 124440,
            oldPrice: 29990,
            discount: Math.floor(((29990 - 24990) / 29990) * 100),
            categoryId: 1,
            categoryName: "ইলেকট্রনিক্স",
            images: [
                "https://picsum.photos/seed/smartphone-x-pro-1/800/800",
                "https://picsum.photos/seed/smartphone-x-pro-2/800/800"
            ],
            rating: 4.6,
            reviewCount: 24,
            stock: 15,
            brand: "TechPro",
            featured: true,
            bestSelling: true,
            newArrival: false,
            createdAt: new Date(Date.now() - 7 * 86400000).toISOString()
        },
        {
            id: 2,
            slug: "wireless-earbuds",
            name: "ওয়্যারলেস ইয়ারবাডস",
            description: "নয়েজ ক্যানসেলিং হেডফোন",
            specification: [
                "ব্লুটুথ ৫.৩",
                "২৪ঘন্টা ব্যাটারি",
                "IPX5 ওয়াটার রেজিস্ট্যান্ট"
            ],
            price: 1890,
            oldPrice: 2990,
            discount: Math.floor(((2990 - 1890) / 2990) * 100),
            categoryId: 1,
            categoryName: "ইলেকট্রনিক্স",
            images: [
                "https://picsum.photos/seed/wireless-earbuds-1/800/800",
                "https://picsum.photos/seed/wireless-earbuds-2/800/800"
            ],
            rating: 4.5,
            reviewCount: 55,
            stock: 30,
            brand: "SoundMax",
            featured: true,
            bestSelling: false,
            newArrival: true,
            createdAt: new Date(Date.now() - 3 * 86400000).toISOString()
        },
        {
            id: 3,
            slug: "laptop-air-slim",
            name: "ল্যাপটপ এয়ার স্লিম",
            description: "লাইটওয়েট ল্যাপটপ নিয়মিত কাজের জন্য",
            specification: [
                "M2 চিপ",
                "৮ গিগাবাইট র্যাম",
                "২৫৬ জিবি SSD"
            ],
            price: 68900,
            oldPrice: 74990,
            discount: Math.floor(((74990 - 68900) / 74990) * 100),
            categoryId: 1,
            categoryName: "ইলেকট্রনিক্স",
            images: [
                "https://picsum.photos/seed/laptop-air-slim-1/800/800",
                "https://picsum.photos/seed/laptop-air-slim-2/800/800"
            ],
            rating: 4.7,
            reviewCount: 8,
            stock: 5,
            brand: "TechPro",
            featured: true,
            bestSelling: false,
            newArrival: false,
            createdAt: new Date(Date.now() - 14 * 86400000).toISOString()
        },
         {
            id: 4,
            slug: "laptop-air-slim",
            name: "ল্যাপটপ এয়ার স্লিম",
            description: "লাইটওয়েট ল্যাপটপ নিয়মিত কাজের জন্য",
            specification: [
                "M2 চিপ",
                "৮ গিগাবাইট র্যাম",
                "২৫৬ জিবি SSD"
            ],
            price: 68900,
            oldPrice: 74990,
            discount: Math.floor(((74990 - 68900) / 74990) * 100),
            categoryId: 1,
            categoryName: "ইলেকট্রনিক্স",
            images: [
                "https://picsum.photos/seed/laptop-air-slim-1/800/800",
                "https://picsum.photos/seed/laptop-air-slim-2/800/800"
            ],
            rating: 4.7,
            reviewCount: 8,
            stock: 5,
            brand: "TechPro",
            featured: true,
            bestSelling: false,
            newArrival: false,
            createdAt: new Date(Date.now() - 14 * 86400000).toISOString()
        }
    ];

    index = async (req, res) => {
        try {
            return res.json(this._success("পণ্য তালিকা সফলভাবে পৈদা হয়েছে", this.products));
        } catch (error) {
            return res.status(500).json(this._error("কিছু সমস্যা হয়েছে", { error: error.message }));
        }
    }

    show = async (req, res) => {
        try {
            const product = this.products.find(p => p.id === req.params.id);
            if (!product) {
                return res.status(404).json(this._error("পণ্য খুঁজে পাওয়া যায়নি"));
            }
            return res.json(this._success("পণ্যের বিস্তারিত", product));
        } catch (error) {
            return res.status(500).json(this._error("কিছু সমস্যা হয়েছে", { error: error.message }));
        }
    }

    create = async (req, res) => {
        try {
            const { name, price, description, specification, categoryId, categoryName, images, rating, stock, brand } = req.body;

            if (!name || !price || !description) {
                return res.status(400).json(this._error("নাম, দাম এবং বিবরণ দিন"));
            }

            const newProduct = {
                id: req.body.id || `p-${Date.now()}`,
                slug: req.body.slug || `p-${Date.now()}`,
                name,
                description,
                specification: specification || [],
                price: Number(price),
                oldPrice: req.body.oldPrice ? Number(req.body.oldPrice) : undefined,
                discount: req.body.oldPrice ? Math.floor(((Number(req.body.oldPrice) - Number(price)) / Number(req.body.oldPrice)) * 100) : undefined,
                categoryId: categoryId || "",
                categoryName: categoryName || "",
                images: images || [],
                rating: Number(rating) || 0,
                reviewCount: Number(req.body.reviewCount) || 0,
                stock: Number(stock) || 0,
                brand: brand || undefined,
                featured: req.body.featured || false,
                bestSelling: req.body.bestSelling || false,
                newArrival: req.body.newArrival || false,
                createdAt: new Date().toISOString()
            };

            this.products.push(newProduct);

            return res.status(201).json(this._success("পণ্য সফলভাবে যোগ হয়েছে", newProduct));
        } catch (error) {
            return res.status(500).json(this._error("কিছু সমস্যা হয়েছে", { error: error.message }));
        }
    }

    update = async (req, res) => {
        try {
            const { id } = req.params;
            const index = this.products.findIndex(p => p.id === id);

            if (index === -1) {
                return res.status(404).json(this._error("পণ্য খুঁজে পাওয়া যায়নি"));
            }

            const updatableFields = ["name", "description", "specification", "categoryId", "categoryName", "images", "brand", "featured", "bestSelling", "newArrival"];
            const updated = { ...this.products[index] };

            updatableFields.forEach(field => {
                if (req.body[field] !== undefined) {
                    updated[field] = req.body[field];
                }
            });

            if (req.body.price !== undefined) updated.price = Number(req.body.price);
            if (req.body.oldPrice !== undefined) updated.oldPrice = Number(req.body.oldPrice);
            if (req.body.stock !== undefined) updated.stock = Number(req.body.stock);
            if (req.body.rating !== undefined) updated.rating = Number(req.body.rating);
            if (req.body.reviewCount !== undefined) updated.reviewCount = Number(req.body.reviewCount);

            if (updated.oldPrice && updated.price) {
                updated.discount = Math.floor(((updated.oldPrice - updated.price) / updated.oldPrice) * 100);
            }

            this.products[index] = updated;

            return res.json(this._success("পণ্য সফলভাবে আপডেট হয়েছে", updated));
        } catch (error) {
            return res.status(500).json(this._error("কিছু সমস্যা হয়েছে", { error: error.message }));
        }
    }

    destroy = async (req, res) => {
        try {
            const { id } = req.params;
            const index = this.products.findIndex(p => p.id === id);

            if (index === -1) {
                return res.status(404).json(this._error("পণ্য খুঁজে পাওয়া যায়নি"));
            }

            this.products.splice(index, 1);

            return res.json(this._success("পণ্য সফলভাবে মুছে ফেলা হয়েছে"));
        } catch (error) {
            return res.status(500).json(this._error("কিছু সমস্যা হয়েছে", { error: error.message }));
        }
    }
}