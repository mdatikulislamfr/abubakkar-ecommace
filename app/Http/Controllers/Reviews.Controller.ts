import Controller from "./Controller.js";


export default new class ReviewsController extends Controller {
    index = (req, res) => {
        try {
            const datas = [
                {
                    id: 1,
                    name: "রফিকুল ইসলাম",
                    addres: "নিয়মিত ক্রেতা",
                    comment:
                        "প্রোডাক্টের কোয়ালিটি এবং ডেলিভারি সার্ভিস দুটোই অসাধারণ। ভবিষ্যতেও কিনব ইনশাআল্লাহ।",
                    rating: 5,
                },
                {
                    id: 2,
                    name: "সাদিয়া আক্তার",
                    addres: "ঢাকা",
                    comment:
                        "খুব দ্রুত ডেলিভারি পেয়েছি। প্যাকেজিং চমৎকার ছিল। রিকমেন্ড করছি সবাইকে।",
                    rating: 5,
                },
            ]
            return res.status(200).json(this._success("Reviews list", datas));
        } catch (e) {
            res.status(500).json(this._error("some error", { error: e.message }));
        }
    }

}