const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected succesfully");
    } catch (error) {
        console.error("error with db connection");
        process.exit(1); // exit with failure
    }
}

module.exports = { connectDB };