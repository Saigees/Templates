import { CommandInteraction, GuildMember, Message } from "discord.js";
import botConfig from "../../bot.config";
import { SlashCommand, TextCommand } from "../../typings";
import { ExtendedInteraction, ExtendedMessage } from "../extensions/ExtendedResponse";

export const PermissionCheck = (command: TextCommand | SlashCommand, context: ExtendedMessage | ExtendedInteraction, member: GuildMember) => {
    if (command.adminOnly && !botConfig.admins.includes(member.id)) return context.reply({ content: `This command is an bot admin only command.` })
    if (member.permissions.has(command.permissions || [])) return context.reply({ content: `It appears you are missing the required permissions to run \`${command.name}\``})
}