const mongoose = require("mongoose");

const tripSchema = mongoose.Schema({
	name: String,
	email: String,
	destination: String,
	totalTravelers: Number,
	budget: Number,
});

const TripModel = mongoose.model("trip", tripSchema);

module.exports = {
	TripModel,
};
