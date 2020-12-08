const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDb = async () => {
	try {
		await mongoose.connect(db, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected');
	} catch (err) {
		console.log(err.message);
		//Exut proccess with failure
		process.exit(1);
	}
};

module.exports = connectDb;
