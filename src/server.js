require("dotenv").config();

const app = require("./app");

// Run server
app.listen(8000, () => {
	console.log(8000);
});
