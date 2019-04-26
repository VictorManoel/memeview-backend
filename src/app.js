const express = require("express");

class App {
	// Init App
	constructor() {
		this.app = express();

		this.middlewares();
		this.routes();
	}

	// Middlewares
	middlewares() {
		this.app.use(express.json());
	}

	// Routes
	routes() {
		this.app.use("/api", require("./routes"));
	}
}

module.exports = new App().app;
