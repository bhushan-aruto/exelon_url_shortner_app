const mongoose = require("mongoose")

const connectToDatabase = async () => {
    try {
        const mongodbUrl = process.env.MONGODB_URI

        if (!mongodbUrl) {
            console.error("missing or empty MONGODB_URI env variable")
            process.exit(1)
        }

        await mongoose.connect(mongodbUrl);

        console.log("connected to mongodb successfully")
    } catch (error) {
        console.error("mongodb connection failed", error.message)
        process.exit(1)
    }
}

module.exports = connectToDatabase