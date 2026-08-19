import Controller from "./Controller.js";


export default new class AppController extends Controller {
    index = (req, res) => {
        try {
            const datas = {
                name: "স্মার্ট বাজার",
                title: "সারা বাংলাদেশে দ্রুত হোম ডেলিভারি • ক্যাশ অন ডেলিভারি",
                delivary: {
                    insite: 60,
                    ousite: 120,
                },
                contact: {
                    email: "atikulcom233@gmail.com",
                    location: "ঢাকা, বাংলাদেশ",
                    phone: "01773038304",
                },
                facebook: "",
                linkdin: "",
                logo: "",
                messager: "",
                youtube: "",
            }
            return res.status(200).json(this._success("Welcome to the E-commerce API", datas));
        } catch (e) {
            res.status(500).json(this._error("some error", { error: e.message }));
        }
    }
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

}