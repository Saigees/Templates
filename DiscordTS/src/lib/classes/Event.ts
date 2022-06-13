import { ClientEvents } from "discord.js";

export default class Event<K extends keyof ClientEvents> {
    constructor(
        public eventName: K,
        public execute: (...args: ClientEvents[K]) => any
    ) { };
}