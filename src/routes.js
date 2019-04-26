const routes = require("express").Router();

// Controller
const AppController = require("./controllers/AppController");

// Routes
routes.get("/", AppController.list);
routes.get("/:id", AppController.once);

module.exports = routes;
