import SlashCommand from "../../../lib/classes/SlashCommand";
import botConfig from "../../../bot.config";
import { EmbedBuilder } from "@discordjs/builders";

export default new SlashCommand({
    name: "ping",
    description: `See the current api/websocket ping for ${botConfig.name}s`,
    cooldown: 15,
    execute: async ({ args, client, message }) => {
        client.extensions.interaction(message).reply({ content: "Pong 🏓 `" + client.ws.ping + "`" })
    }
})