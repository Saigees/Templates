import TextCommand from "../../../lib/classes/TextCommand";
import { msToTime } from "../../../lib/utilities/Cooldowns";

export default new TextCommand({
    name: "ping",
    cooldown: 5,
    execute: async ({ args, client, message }) => {
            client.extensions.message(message).reply({ content: `Pong 🏓 \`${client.ws.ping}ms\`` })
    }
})