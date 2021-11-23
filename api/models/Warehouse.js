const mongoose = require('mongoose')
const Schema = mongoose.Schema

const warehouseSchema = new Schema({
	title:  {
		type: String,
		required: true
	},
	length: {
		type: String,
		required: true
	},
	width: {
		type: String,
		required: true
	},
	height: {
		type: String,
		required: true
	},
	products: []
})

module.exports = mongoose.model('warehouses', warehouseSchema)