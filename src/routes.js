const routes = require("express").Router();

routes.get("/", (req, res) => {
	res.json({ teste: "ok" });
});

module.exports = routes;
