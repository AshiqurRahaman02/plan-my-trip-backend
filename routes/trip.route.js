const express = require("express");
const { TripModel } = require("../models/trip.model");

require("dotenv").config();

const tripRouter = express.Router();

tripRouter.post("/post", async (req, res) => {
	try {
		const { name, email, destination, totalTravelers, budget } = req.body;
		const newTrip = new TripModel({
			name,
			email,
			destination,
			totalTravelers,
			budget,
		});
		await newTrip.save();
		res.status(201).json({ message: "Trip data added successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

tripRouter.get("/retrieve", async (req, res) => {
	try {
		const trips = await TripModel.find();
		res.status(200).json(trips);
	} catch (error) {
		res.status(500).json({
			error: error.message,
		});
	}
});

tripRouter.delete("/delete/:id", async (req, res) => {
	try {
		const deletedTrip = await TripModel.findByIdAndDelete(req.params.id);
		if (!deletedTrip) {
			return res.status(404).json({ error: "Trip not found" });
		}
		res.status(200).json({ message: "Trip data deleted successfully" });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

tripRouter.get("/filter", async (req, res) => {
	try {
		const { destination } = req.query;
		const filteredTrips = await TripModel.find({ destination });
		res.status(200).json(filteredTrips);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

tripRouter.get("/sort", async (req, res) => {
	try {
		const { sort } = req.query;

		if (sort === "asc" || sort === "desc") {
			const sortDirection = sort === "asc" ? 1 : -1;

			const sortedTrips = await TripModel.find().sort({
				budget: sortDirection,
			});
			res.status(200).json(sortedTrips);
		} else {
			res.status(400).json({
				error: "Invalid sort parameter. Use 'asc' or 'desc'.",
			});
		}
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = {
	tripRouter,
};
