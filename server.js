const app = require("./src/app")
const connectToDatabase = require("./src/config/db")

const serverPort = process.env.SERVER_PORT

if (!serverPort) {
    console.error("missing or empty SERVER_PORT env variable")
    process.exit(1)
}

connectToDatabase().then(() => {
    app.listen(serverPort, () => {
        console.log(`server running is running on port -> ${serverPort}`)
    });
});