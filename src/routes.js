const routes = require("express").Router();

routes.get("/", (req, res) => {
	res.json({ teste: "ok" });
});

return routes;