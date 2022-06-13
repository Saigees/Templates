import { ApplicationCommandData, ApplicationCommandType, BitFieldResolvable, ChatInputApplicationCommandData, ColorResolvable, CommandInteraction, CommandInteractionOption, CommandInteractionOptionResolver, CommandInteractionResolvedData, GatewayIntentsString, GuildMember, Message, PermissionsString, PresenceData } from "discord.js";
import { RawInteractionData } from "discord.js/typings/rawDataTypes";
import ExtendedClient from "../lib/extensions/ExtendedClient";
import { ExtendedInteraction, ExtendedMessage } from "../lib/extensions/ExtendedResponse";

export interface ExtendedClientOptions {
    commandType: "text" | "slash" | "both";
}

export interface ColourTypes<x = ColorResolvable> {
    success: x;
    warning: x;
    error: x;
    primary: x;
    secondary: x;
}

export interface BotConfig {
    name: string;
    commandType: "text" | "slash" | "both";
    database: boolean;
    prefix: string;
    version: "1.0.0";
    admins: string[];
    sandboxServers: string[];
    supportServer: string;
    invites: { minimal: string; full: string; default: "minimal" | "full"; };
    gitHub?: string;
    presence?: PresenceData;
    requiredPermissions: PermissionsString[];
    colours: ColourTypes;
    intents: BitFieldResolvable<GatewayIntentsString, number>[];
}


export type CommandBase = {
    category?: string;
    permissions?: PermissionString[];
    cooldown?: number;
    adminOnly?: boolean;
}

export interface TextCommandExecuteOptions {
    message: Message;
    client: ExtendedClient;
    args: string[];
}

export interface SlashCommandExecuteOptions {
    message: CommandInteraction;
    client: ExtendedClient;
    args: CommandInteractionOptionResolver;
}

export type TextCommand = {
    name: string;
    description?: string;
    aliases?: string[];
    execute: (options: TextCommandExecuteOptions) => any; 
} & CommandBase

export type SlashCommand = { 
    name: string;
    description: string;
    type?: 'CHAT_INPUT' | ApplicationCommandTypes.CHAT_INPUT;
    options?: ApplicationCommandData[];
    execute: (options: SlashCommandExecuteOptions) => any;
} & CommandBase

export interface _LoggerTypes {
    ERROR: string;
    WARN: string;
    INFO: string;
    HTTPS: string;
    VERBOSE: string;
    DEBUG: string;
    SILLY: string;
}

export interface _LoggerOptions {
    label: keyof _LoggerTypes;
    src: string;
}

export class Logger {
    error(message: string, options: _LoggerOptions): any;
    warn(message: string, options: _LoggerOptions): any;
    info(message: string, options: _LoggerOptions): any;
    https(message: string, options: _LoggerOptions): any;
    verbose(message: string, options: _LoggerOptions): any;
    debug(message: string, options: _LoggerOptions): any;
    silly(message: string, options: _LoggerOptions): any;
}
