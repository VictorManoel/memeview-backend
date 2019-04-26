const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

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
		this.app.use(cors({ origin: process.env.ORIGIN }));
		this.app.use(helmet());
		this.app.use(morgan("dev"));
	}

	// Routes
	routes() {
		this.app.use("/api", require("./routes"));
	}
}

module.exports = new App().app;
