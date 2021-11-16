const mongoose = require('mongoose')
const Schema = mongoose.Schema

const warehouseSchema = new Schema({
	title:  {
		type: String,
		required: true
	},
	length: {
		type: Number,
		required: true
	},
	width: {
		type: Number,
		required: true
	},
	height: {
		type: Number,
		required: true
	},
	products: []
})

module.exports = mongoose.model('warehouses', warehouseSchema)