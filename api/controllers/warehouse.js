const Warehouse = require('../models/Warehouse')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
	try {
		const warehouses = await Warehouse.find()
		console.log(warehouses)
		res.status(200).json(warehouses)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.getById = async function (req, res) {
	try {
		const warehouse = await Warehouse.findById(req.params.id)
		res.status(200).json(warehouse)
		console.log("get by ID")
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.remove = async function (req, res) {
	try {
		await Warehouse.remove({_id: req.params.id})
		res.status(200).json({
			message: "Warehouse deleted."
		})
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.create = async function (req, res) {
	try {
		const warehouse = await new Warehouse({
			title: req.body.title,
			length: req.body.length,
			width: req.body.width,
			height: req.body.height,
			products: req.body.products
		})
		warehouse.save()
		res.status(201).json(warehouse)

	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.update = async function (req, res) {
	try {
		const warehouse = await Warehouse.findOneAndUpdate(
			{_id: req.params.id},
			{$set: req.body},
			{new: true}
		)
		res.status(200).json(warehouse)
	} catch (e) {
		errorHandler(res, e)
	}
}
