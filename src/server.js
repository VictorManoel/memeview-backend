require("dotenv").config();

const app = require("./app");

// Server port
const port = process.env.PORT || 8000;

// Run server
app.listen(port, () => {
	console.log(`> Server listening in port ${port}`);
});
