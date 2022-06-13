import { EmbedBuilder } from "@discordjs/builders";
import { APIEmbed } from "discord.js";
import client from "../..";

export default class ExtendedEmbed {
    constructor(data: APIEmbed) {
        if (!data.footer) data['footer'] = { text: `Saige's Templates`, icon_url: client.user.displayAvatarURL({ extension: "png" }) }
        return new EmbedBuilder(data)
    }
}