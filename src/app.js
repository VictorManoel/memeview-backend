const express = require("express");

class App {
	// Init App
	constructor() {
		this.app = express();

		this.middlewares();
		this.routes();
	}

	// Middlewares
	middlewares() {}

	// Routes
	routes() {}
}

module.exports = new App().app;
