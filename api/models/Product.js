const mongoose = require('mongoose')
const Schema = mongoose.Schema

const productSchema = new Schema({
	productName: {
		type: String,
		required: true
	},
	manufacturer: {
		type: String,
		required: true
	},
	itemNumber: {
		type: String,
		required: true
	},
	purchasingTechnology: {
		type: String,
		required: true
	},
	shipmentMethod: {
		type: String,
		required: true
	},
	warehouse: {
		ref: 'warehouses',
		type: Schema.Types.ObjectId
	}
})

module.exports = mongoose.model('products', productSchema)