import Event from "../../../lib/classes/Event";
import botConfig from "../../../bot.config";
import client from "../../..";
import { ExtendedMessage } from "../../../lib/extensions/ExtendedResponse";
import Cooldowns from "../../../lib/utilities/Cooldowns";
import { PermissionCheck } from "../../../lib/utilities/Checks";

export default new Event("messageCreate", (message) => {
    if (!message.guild || message.author.bot || !message.content.startsWith(botConfig.prefix)) return;
    const [cmd, ...args] = message.content.slice(botConfig.prefix.length).trim().split(/ +/g)
    const command = client.textCommands.find(f => f.name.toLowerCase() === cmd.toLowerCase() || f.aliases?.includes(cmd.toLowerCase()));
    if (!command) return;
    PermissionCheck(command, client.extensions.message(message), message.member)
    Cooldowns(command.name, message.member, command, { args: args, client: client, message }, message, "slash")
})