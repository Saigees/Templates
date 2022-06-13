import mongoose from "mongoose"
import client from ".."

export default (mongo_uri) => {
    mongoose.connect(mongo_uri).then(() => {
        client.logger.info(`Conncected to database`, { label: "INFO", src: "src/database" })
    }).catch((err) => {
        client.logger.error(`Failed to connect to database`, { label: "ERROR", src: "src/database" })
    })
}