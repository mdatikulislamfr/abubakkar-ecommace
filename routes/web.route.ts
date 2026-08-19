import Route from "express-route-framework";

Route.get("/", (_, res) => res.send("web"));

export default Route.getRouter();