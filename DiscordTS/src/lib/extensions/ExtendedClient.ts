import { ApplicationCommandData, Client, ClientEvents, Collection, Partials } from "discord.js";
import botConfig from "../../bot.config"
import { BotConfig, Logger as LoggerType, SlashCommand, TextCommand } from "../../typings";
import Logger from "../utilities/Logger";
import glob from "glob";
import { promisify } from "util";
import Event from "../classes/Event";
import database from "../../database";
import Extensions from ".";
const globPromise = promisify(glob);

export default class ExtendedClient extends Client {
    public textCommands: Collection<string, TextCommand> = new Collection()
    public slashCommands: Collection<string, SlashCommand> = new Collection()
    public config: BotConfig = botConfig;
    public version: string = process.env.VERSION === "developement" ? `${botConfig.version}-dev` : botConfig.version
    public logger: LoggerType = Logger as unknown as LoggerType
    public extensions = new Extensions()._()
    constructor() {
        super({
            intents: botConfig.intents,
            partials: [Partials.Channel, Partials.GuildMember, Partials.GuildScheduledEvent, Partials.Message, Partials.Reaction, Partials.ThreadMember, Partials.User],
            presence: botConfig.presence,
            allowedMentions: { parse: ["users"] },
        })
        this.__()
    }

    private async _importFile(path: string) {
        return await (await import(path))?.default;
    }

    private async __() {
        this.login(process.env.TOKEN)
        if (this.config.database) database(process.env.MONGO_URL)
        this._loadCommands()
        this._loadEvents()
    }

    private async _loadCommands() {
        const commands: { type: "text" | "slash", filePath: string }[] = [];
        const slashCommands: ApplicationCommandData[] = []
        if (botConfig.commandType.toLowerCase() === "both") {
            await (await globPromise(`${__dirname}/../../bot/textCommands/**/**{.ts,.js}`)).forEach((filePath) => { commands.push({ type: "text", filePath }) })
            await (await globPromise(`${__dirname}/../../bot/slashCommands/**/**{.ts,.js}`)).forEach((filePath) => { commands.push({ type: "slash", filePath }) })
        } else {
            await (await globPromise(`${__dirname}/../../bot/${botConfig.commandType.toLowerCase()}Commands/**/**{.ts,.js}`)).forEach((filePath) => { commands.push({ type: botConfig.commandType as "text" | "slash", filePath }) })
        }
        commands.forEach(async (res) => {
            const file: TextCommand | SlashCommand = await this._importFile(res.filePath);
            if (!file || !file.name) return;
            let collection: Collection<string, TextCommand | SlashCommand>;
            if (res.type === "slash") { collection = this.slashCommands };
            if (res.type === "text") { collection = this.textCommands };
            collection.set(file.name, file)
            if (res.type === "slash") {
                slashCommands.push(file as ApplicationCommandData)
            }
        })
        this.on("ready", () => {
            if (botConfig.commandType === "slash" || botConfig.commandType === "both") {
                if (process.env.VERSION !== "production") {
                    botConfig.sandboxServers.forEach((serverId) => {
                        const guild = this.guilds.cache.find(f => f.id === serverId);
                        if (!guild) return this.logger.silly(`Cannot locate guild with guild id "${serverId}"`, { label: "SILLY", src: "src/lib/extensions/ExtendedClient.ts" });
                        guild.commands.set(slashCommands)
                    })
                } else {
                    this.application.commands.set(slashCommands)
                }
            }
        })
    }

    private async _loadEvents() {
        const eventFilePaths: string[] = await globPromise(`${__dirname}/../../bot/events/**/**{.ts,.js}`);
        eventFilePaths.forEach(async (filePath) => {
            const file: Event<keyof ClientEvents> = await this._importFile(filePath);
            if (!file.eventName) return;
            this.on(file.eventName, file.execute)
        })
    }
}
