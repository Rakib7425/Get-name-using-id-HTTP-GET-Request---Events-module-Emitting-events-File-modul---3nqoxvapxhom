const fs = require("fs");
const express = require("express");
const app = express();

// Importing productNames from names.json file
const productNames = JSON.parse(fs.readFileSync(`${__dirname}/data/names.json`));

//Middleware
app.use(express.json());

// GET endpoint for sending the products to client by id
//Endpoint - /api/v1/names/:id
app.get("/api/v1/names/:id", (req, res) => {
	try {
		// const productNames = JSON.parse(fs.readFileSync(`${__dirname}/data/names.json`));
		// console.log(productNames[2]);
		productNames.map((item) => {
			console.log(item);
		});
		const paramId = Number(req.params.id);
		console.log(paramId);

		if (typeof paramId !== "number") {
			return res.status(400).json({ error: "Invalid data types" });
		}

		if (!productNames[paramId - 1]) {
			return res.status(404).json({ status: "failed", message: "Not found!" });
		} else if (productNames[paramId - 1]) {
			res.status(200).json({
				id: productNames[paramId - 1].id,
				name: productNames[paramId - 1].name,
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = app;
