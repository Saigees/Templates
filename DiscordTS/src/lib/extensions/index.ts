import { APIEmbed } from "discord.js";
import ExtendedEmbed from "./ExtendedEmbed";
import { ExtendedInteraction, ExtendedMessage } from "./ExtendedResponse";

export default class Extensions {
    public _() {
        return {
            interaction: (ctx) => {
                return new ExtendedInteraction(ctx)
            },
            message: (ctx) => {
                return new ExtendedMessage(ctx)
            },
            embed: (data: APIEmbed) => {
                return new ExtendedEmbed(data)
            }
        }
    }
}