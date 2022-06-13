import { Request, Response } from "express";

export type Execute = (req: Request, res: Response) => any;

export interface File {
    route: string;
    type: "GET" | "POST" | "PUT"
    middleware?: any[];
    execute: Execute;
}

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
