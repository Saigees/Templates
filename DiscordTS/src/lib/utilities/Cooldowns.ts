import { ExtendedInteraction, ExtendedMessage } from "../extensions/ExtendedResponse";
import Cooldowns from "../../database/schemas/Cooldowns";
import { CommandInteraction, GuildMember, Message } from "discord.js";
import { SlashCommand, SlashCommandExecuteOptions, TextCommand, TextCommandExecuteOptions } from "../../typings";
import client from "../..";

export function msToTime(ms: number) {
    let str = ""
    let seconds = (ms / 1000).toFixed(1);
    let minutes = (ms / (1000 * 60)).toFixed(1);
    let hours = (ms / (1000 * 60 * 60)).toFixed(1);
    let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
    let weeks = (ms / (1000 * 60 * 60 * 24 * 7)).toFixed(1);
    let months = (ms / (1000 * 60 * 60 * 24 * 30)).toFixed(1);
    if (parseInt(seconds) < 60) str = seconds + " second(s)";
    else if (parseInt(minutes) < 60) str = minutes + " minute(s) " + str;
    else if (parseInt(hours) < 24) str = hours + " hour(s) " + str;
    else if (parseInt(days) < 7) str = days + " day(s) " + str
    if (parseInt(days) > 7) str = weeks + " week(s) " + str;
    else if (parseInt(days) > 30) str = months + " month(s) " + str
    return str
}

export default async (commandName: string, user: GuildMember, command: SlashCommand | TextCommand, commandExecuteableOptions: TextCommandExecuteOptions | SlashCommandExecuteOptions, context: Message | CommandInteraction, type: "slash" | "text") => {
    const cooldown = await Cooldowns.findOne({ user_id: user.id, commandName });
    //@ts-ignore
    const commandExecute = () => command.execute(commandExecuteableOptions)
    if (!command.cooldown) return commandExecute()
    if (cooldown) {
        if (cooldown.timeRemaining > Date.now()) {
            const difference = Math.floor(cooldown.timeRemaining - Date.now());
            let msg: ExtendedMessage | ExtendedInteraction = client.extensions.message(context)
            if (type === "slash") { msg = client.extensions.interaction(context) }
            msg.reply({ content: `<@${user.id}>, Slowdown please wait another **${msToTime(difference)}**` })
        } else if (cooldown.timeRemaining <= Date.now()) {
            await Cooldowns.findOneAndUpdate({
                commandName: commandName,
                user_id: user.id,
                timeRemaining: Date.now() + command.cooldown * 1000,
            })
            commandExecute()
        }
    } else {
        await Cooldowns.create({
            commandName: commandName,
            timeRemaining: Date.now() + command.cooldown * 1000,
            user_id: user.id
        })
        commandExecute()
    }
}