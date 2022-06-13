import { Express, Request, Response } from "express"
import { promisify } from "util"
import glob from "glob";
import importFile from "../lib/utils/importFile";
import { File } from "../typings";

const globPromise = promisify(glob)
export default async (app: Express) => {
    const files: string[] = await globPromise(`${__dirname}/**/*{.ts,.js}`)
    files.forEach(async (filePath) => {
        const file: File = await importFile(filePath)
        if (!file || !file.route) return;
        if (file.type === "GET") { app.get(file.route, file.middleware ? file.middleware : [], async (req: Request, res: Response) => { file.execute(req, res) }) }
        if (file.type === "POST") { app.post(file.route, file.middleware ? file.middleware : [], async (req: Request, res: Response) => { file.execute(req, res) }) }
        if (file.type === "PUT") { app.put(file.route, file.middleware ? file.middleware : [], async (req: Request, res: Response) => { file.execute(req, res) }) }
    })
}