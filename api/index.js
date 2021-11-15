const app = require('./app')
const mongoose = require('mongoose')
const keys = require("./config/keys");
const port = process.env.PORT ||  6000

async function startApp() {
	try {
		await mongoose.connect(keys.DB_URL)
		app.listen(port,  () => console.log(`Server is run on ${port}`))
	} catch (e) {
		console.log(e)
	}
}

startApp()
