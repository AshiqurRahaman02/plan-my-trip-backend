const express = require("express");
const cors = require("cors");
const { conection } = require("./config/db");
const { tripRouter } = require("./routes/trip.route");
require("dotenv").config();

const app = express();

const port = process.env.port || 3000;

app.use(express.json());
app.use(cors());

app.use("/trip", tripRouter);

app.get("/", (req, res) => {
	res.send("Welcome to the Express server");
});

app.listen(port, async () => {
	try {
		await conection;
		console.log("Connected with db");
	} catch (error) {
		console.log("Unable to connect with db");
	}
	console.log("App listening on port  " + port);
});
