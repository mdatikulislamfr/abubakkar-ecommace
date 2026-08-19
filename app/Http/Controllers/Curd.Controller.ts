import Controller from "./Controller.js";

export default new class CurdController extends Controller {
    datalist = [
        {
            id: 1,
            name: "sdhfg",
            taka: 500
        },
        {
            id: 2,
            name: "sdhfg",
            taka: 500
        },
        {
            id: 3,
            name: "sdhfg",
            taka: 500
        }
    ]
    index = (req, res) => {
        const data = this.datalist;
        res.render("Home", { data });
    }
    add = (req, res) => {
        res.render("Add");
    }
    del = (req, res) => {
        this.datalist = this.datalist.filter((imte) => imte.id != req.params.id);
        res.redirect("/");
    }
    create = (req, res) => {
        this.datalist.push({
            id: Date.now(),
            name: req.body.title,
            taka: req.body.taka
        })
        res.redirect("/");
    }
}