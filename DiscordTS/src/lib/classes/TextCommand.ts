import { TextCommand as TextCommandOptions } from "../../typings";

export default class TextCommand {
    constructor(options: TextCommandOptions) {
        Object.assign(this, options)
    }
}