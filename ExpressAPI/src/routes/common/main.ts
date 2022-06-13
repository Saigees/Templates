import Route from "../../lib/Route";

export default new Route({
    route: "/",
    type: "GET",
    execute: async (req, res) => {
        res.status(200).send({ what: "cookies", with: "milk"})
    }
})