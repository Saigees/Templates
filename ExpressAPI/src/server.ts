import express from "express";
import bodyParser from "body-parser";
import "dotenv/config";
import routes from "./routes";
import database from "./database";
import cors from "cors"
import Logger from "./lib/Logger";
import { Logger as LoggerTypes } from "./typings";
const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors({
    origin: []
}))

routes(app);
database();

export const logger: LoggerTypes = Logger as unknown as LoggerTypes

app.listen(process.env.PORT, () => {
   logger.info(`Listening to port ${process.env.PORT} | http://localhost:${process.env.PORT}`, { src: "src/server.ts", label: "INFO" })
})