import { SlashCommand as SlashCommandOptions } from "../../typings";

export default class SlashCommand {
    constructor(options: SlashCommandOptions) {
        Object.assign(this, options)
    }
}