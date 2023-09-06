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
		const paramId = Number(req.params.id);
		const product = productNames.find((p) => p.id === paramId);
		// console.log(paramId);

		if (typeof paramId !== "number") {
			return res.status(400).json({ error: "Invalid product id types" });
		}

		if (!product) {
			return res.status(404).json({ status: "failed", message: "Not found!" });
		} else if (product) {
			// const productName = product.name;
			res.status(200).json({
				status: "success",
				message: "Product Name fetched successfully",
				data: {
					// [product.name]: product,
					name:product,
					// id: product.id,
					// name: product.name,
				},
			});
		}
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Internal server error" });
	}
});

module.exports = app;
