import { Request, Response } from "express";
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
    index = (_: Request, res: Response) => {
        const data = this.datalist;
        res.render("Home", { data });
    }
    add = (_: Request, res: Response) => {
        res.render("Add");
    }
    del = (req: Request, res: Response) => {
        const id = req.params.id;
        this.datalist = this.datalist.filter((imte) => imte.id != Number(id));
        res.redirect("/");
    }
    create = (req: Request, res: Response) => {
        this.datalist.push({
            id: Date.now(),
            name: req.body.title,
            taka: req.body.taka
        })
        res.redirect("/");
    }
}