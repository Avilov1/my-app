const Product = require('../models/Product')
const errorHandler = require('../utils/errorHandler')

module.exports.getByWarehouseId = async function (req, res) {
	try {
		const products = await Product.find({
			warehouse: req.params.warehouseId
		})
		res.status(200).json(products)
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.remove = async function (req, res) {
	try {
		await Product.remove({_id: req.params.id})
		res.status(200).json({
			message: 'Product deleted.'
		})
	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.create = async function (req, res) {
	try {
		const product = await new Product({
			productName: req.body.productName,
			manufacturer: req.body.manufacturer,
			itemNumber: req.body.itemNumber,
			purchasingTechnology: req.body.purchasingTechnology,
			shipmentMethod: req.body.shipmentMethod,
			warehouse: req.body.warehouse
		}).save()

		res.status(201).json(product)

	} catch (e) {
		errorHandler(res, e)
	}
}

module.exports.update = async function (req, res) {
	try {
		const product = await Product.findByIdAndUpdate(
			{_id: req.params.id},
			{$set: req.body},
			{new: true}
		)
		res.status(200).json(product)
	} catch (e) {
		errorHandler(res, e)
	}
}