import { UserModel as User } from "../../Models/user.model.js";
import Controller from "./Controller.js";

export default new class UserController extends Controller {
    registation = async (req, res) => {
        // try {

        //     let { name, mobail, password } = req.body;
        //     // remove extra space
        //     name = name?.trim();
        //     mobail = mobail?.trim();
        //     password = password?.trim();

        //     // validation
        //     if (!name || !mobail || !password) {
        //         return res.status(400).json(
        //             this._error("সবগুলো ইনপুট পূরণ করুন")
        //         );
        //     }

        //     // mobile validation
        //     if (this._validmobila(mobail)) {
        //         return res.status(400).json(
        //             this._error("সঠিক মোবাইল নাম্বার দিন")
        //         );
        //     }

        //     // password validation
        //     if (password.length < 6) {
        //         return res.status(400).json(
        //             this._error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে")
        //         );
        //     }

        //     // check user exists
        //     const oldUser = await User.where("mobail", "=", mobail).first();
        //     if (oldUser) {
        //         return res.status(400).json(
        //             this._error("এই মোবাইল নাম্বার আগে থেকেই ব্যবহার করা হয়েছে")
        //         );
        //     }

        //     // create user
        //     const pass = await bcrypt.hash(password, 10);
        //     const user = await User.add({
        //         name,
        //         mobail,
        //         password: pass
        //     });

        //     return res.status(201).json(
        //         this._success("রেজিস্ট্রেশন সফল হয়েছে", user)
        //     );

        // } catch (error) {
        //     console.log(error.toString());
        //     return res.status(500).json(
        //         this._error("সার্ভার সমস্যা হয়েছে")
        //     );
        // }
    };
    sendcode = async (req, res) => {
        // try {

        //     let { mobail } = req.body;

        //     mobail = mobail?.trim();

        //     // validation
        //     if (!mobail) {
        //         return res.status(400).json(
        //             this._error("মোবাইল নাম্বার দিন")
        //         );
        //     }
        //     // check mobail number in sevrer
        //     const validmobail = await User.where("mobail", "=", mobail).first();

        //     if (!validmobail) {
        //         return res.status(400).json(
        //             this._error("সঠিক মোবাইল নাম্বার দিন")
        //         );
        //     }
        //     // bangladesh mobile check
        //     if (this._validmobila(mobail)) {
        //         return res.status(400).json(
        //             this._error("সঠিক মোবাইল নাম্বার দিন")
        //         );
        //     }
        //     // 4 digit code generate
        //     const code = Math.floor(1000 + Math.random() * 9000);
        //     const token = await jwt.sign({ code, mobail, time: Date.now() }, process.env.JWT_SECRET_OTP, { expiresIn: "2m" });
        //     // console output
        //     const { data } = await smsService.otp(mobail, code);
        //     if (data.response_code != 202) {
        //         return res.status(500).json(
        //             this._error(
        //                 "দুঃখিত, এই মুহূর্তে SMS পাঠানো সম্ভব হচ্ছে না। পরে আবার চেষ্টা করুন"
        //             )
        //         );
        //     }
        //     return res.status(200).json(
        //         this._success("ভেরিফিকেশন কোড পাঠানো হয়েছে", {
        //             mobail,
        //             code,
        //             token
        //         })
        //     );

        // } catch (error) {

        //     console.log(error.toString());

        //     return res.status(500).json(
        //         this._error("সার্ভার সমস্যা হয়েছে")
        //     );
        // }
    };
    varyfacatin = async (req, res) => {
        // try {

        //     const { mobail, code } = req.body;

        //     if (!mobail || !code) {
        //         return res.status(400).json(
        //             this._error("ডাটা অসম্পূর্ণ")
        //         );
        //     }
        //     const data = await jwt.verify(mobail, process.env.JWT_SECRET_OTP);
        //     if (!data) {
        //         return res.status(400).json(
        //             this._error("ভুল OTP")
        //         );
        //     }
        //     // check code
        //     if (data.code != code) {
        //         return res.status(400).json(
        //             this._error("ভুল OTP")
        //         );
        //     }
        //     return res.json(
        //         this._success("ভেরিফিকেশন সফল হয়েছে")
        //     );
        // } catch (error) {
        //     console.log(error.toString());
        //     return res.status(400).json(
        //         this._error("OTP expired বা invalid")
        //     );
        // }
    };
    updaetPass = async (req, res) => {
        try {

            let { newpass, confrim, mobail } = req.body;

            // remove extra space
            newpass = newpass?.trim();
            confrim = confrim?.trim();

            // validation
            if (!newpass || !confrim || !mobail) {
                return res.status(400).json(
                    this._error("সবগুলো ইনপুট পূরণ করুন")
                );
            }

            // password length
            if (newpass.length < 6) {
                return res.status(400).json(
                    this._error("পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে")
                );
            }

            // confirm match
            if (newpass !== confrim) {
                return res.status(400).json(
                    this._error("পাসওয়ার্ড মিলেনি")
                );
            }
            const pass = await bcrypt.hash(newpass, 10);

            await User.where("mobail", mobail).update({
                password: pass
            });

            return res.json(
                this._success("পাসওয়ার্ড সফলভাবে আপডেট হয়েছে")
            );

        } catch (error) {

            console.log(error.toString());

            return res.status(500).json(
                this._error("সার্ভার সমস্যা হয়েছে")
            );
        }
    };
    login = async (req, res) => {
        try {

            let { mobail, password } = req.body;

            // remove extra space
            mobail = mobail?.trim();
            password = password?.trim();

            // validation
            if (!mobail || !password) {
                return res.status(400).json(
                    this._error("মোবাইল নাম্বার এবং পাসওয়ার্ড দিন")
                );
            }

            // mobile check
            if (this._validmobila(mobail)) {
                return res.status(400).json(
                    this._error("সঠিক মোবাইল নাম্বার দিন")
                );
            }
            // find user
            const token = await login({
                mobail,
                password
            })
            // smsService.one(mobail, "New Device Login at " + datetime.today() + " " + datetime.time())
            return res.json(
                this._success("লগইন সফল হয়েছে", token)
            );

        } catch (error) {

            console.log(error.toString());

            return res.status(500).json(
                this._error(error.toString())
            );
        }
    };
    logout = async (req, res) => {
        try {
            await logout(req.token);
            return res.status(200).json(
                this._success("লগআউট সফল হয়েছে")
            );
        } catch (error) {
            console.log(error.toString());
            return res.status(500).json(
                this._error("সার্ভার সমস্যা হয়েছে")
            );
        }
    };
    profile = async (req, res) => {
        try {
            const user = {
                name: "রাহিম আহমেদ",
                balance: "1000",
                mail: "demo@gmail.com",
                phone: "01777346834",
                rang: "gold",
                refLink: "https://shop.com/ref/rahim123",
                refBalence: 100,
            }
            return res.json(this._success("Profile retrieved successfully", user));
        } catch (error) {
            return res.status(500).json(this._error("Something went wrong", { error: error.message }));
        }
    }
    refhistoy = async (req, res) => {
        try {
            const history = [
                {
                    date: "১৬ জুলাই, ২০২৬",
                    commitin: "100",
                    userName: "san19"
                }
            ];
            return res.json(this._success("History retrieved successfully", history));
        } catch (error) {
            return res.status(500).json(this._error("Something went wrong", { error: error.message }));
        }
    }
    uppassword = async (req, res) => {
        try {

            let { old, npass } = req.body;
            const auther = req.user;

            // remove extra space
            old = old?.trim();
            npass = npass?.trim();

            // validation
            if (!old || !npass) {
                return res.status(400).json(
                    this._error("সবগুলো ইনপুট পূরণ করুন")
                );
            }
            // password length
            if (npass.length < 6) {
                return res.status(400).json(
                    this._error(
                        "পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে"
                    )
                );
            }
            // same password check
            if (old === npass) {
                return res.status(400).json(
                    this._error("নতুন পাসওয়ার্ড ভিন্ন হতে হবে")
                );
            }
            // old password check
            if (!await bcrypt.compare(old, auther.password)) {
                return res.status(400).json(
                    this._error("পুরাতন পাসওয়ার্ড ভুল")
                );
            }
            const pass = await bcrypt.hash(npass, 10);
            // update password
            await User.update(
                auther.id,
                () => ({
                    password: pass
                })
            );
            return res.json(
                this._success(
                    "পাসওয়ার্ড সফলভাবে আপডেট হয়েছে"
                )
            );

        } catch (error) {
            console.log(error.toString());
            return res.status(500).json(
                this._error("সার্ভার সমস্যা হয়েছে")
            );
        }
    };
    infoupdate = async (req, res) => {
        try {

            let {
                name,
                email
            } = req.body;

            const auther = req.user;

            // remove extra space
            name = name?.trim();
            email = email?.trim();

            // validation
            if (!name) {
                return res.status(400).json(
                    this._error("নাম লিখুন")
                );
            }
            // email validation
            if (email && !this._validmail(email)) {
                return res.status(400).json(
                    this._error("সঠিক ইমেইল দিন")
                );
            }

            // update user info
            await User.update(
                auther.id,
                () => ({
                    name,
                    email
                })
            );

            return res.json(
                this._success(
                    "তথ্য সফলভাবে আপডেট হয়েছে"
                )
            );

        } catch (error) {

            console.log(error.toString());

            return res.status(500).json(
                this._error("সার্ভার সমস্যা হয়েছে")
            );
        }
    };

}   
