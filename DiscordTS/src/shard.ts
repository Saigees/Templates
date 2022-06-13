import "dotenv/config";
import { ShardingManager } from "discord.js";

const manager = new ShardingManager(`./dist/index.js`, {
    token: process.env.TOKEN
})