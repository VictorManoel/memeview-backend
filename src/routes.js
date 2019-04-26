const routes = require("express").Router();

// Controller
const AppController = require("./controllers/AppController");

routes.get("/", AppController.list);

module.exports = routes;
