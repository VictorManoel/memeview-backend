const routes = require("express").Router();

// Controller
const AppController = require("./controllers/AppController");

// Routes
routes.get("/", AppController.list);
routes.get("/v/:id", AppController.once);
routes.get("/more", AppController.more);

module.exports = routes;
