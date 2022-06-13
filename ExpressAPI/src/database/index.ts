import mongoose from "mongoose";
import { logger } from "../server";

export default () => {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        logger.info(`Failed to connect to database`, { src: "src/database", label: "INFO" })
    }).catch((err) => {
        logger.error(`Failed to connect to database`, { src: "src/database", label: "ERROR" })
    })
}