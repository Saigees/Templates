import { ApplicationCommandOptionData, CommandInteractionOptionResolver, GuildMember } from "discord.js";
import client from "../../..";
import Event from "../../../lib/classes/Event";
import { PermissionCheck } from "../../../lib/utilities/Checks";
import Cooldowns from "../../../lib/utilities/Cooldowns";

export default new Event("interactionCreate", (interaction) => {
    if (interaction.isChatInputCommand()) {
        if (!interaction.commandName) return interaction.reply({ content: `No command found under \`${interaction.commandName}\`` });
        const command = client.slashCommands.find(f => f.name.toLowerCase() === interaction.commandName.toLowerCase())
        if (!command) return interaction.reply({ content: `No command found under \`${interaction.commandName}\`` });
        PermissionCheck(command, client.extensions.interaction(interaction), interaction.member as GuildMember)
        Cooldowns(command.name, interaction.member as GuildMember, command, { args: interaction.options as CommandInteractionOptionResolver, client: client, message: interaction }, interaction, "slash")
    }
})