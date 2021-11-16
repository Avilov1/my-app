const app = require('./app')
const mongoose = require('mongoose')
const keys = require("./config/keys");
const port = process.env.PORT || 5000

async function startApp() {
	try {
		mongoose.connect(keys.DB_URL).then(console.log('mongoDB is connect'))
		app.listen(port,  () => console.log(`Server is run on ${port}`))
	} catch (e) {
		console.log(e)
	}
}

startApp()
