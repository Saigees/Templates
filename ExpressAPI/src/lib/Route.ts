import { File } from "../typings";

export default class Route {
    constructor(options: File) {
        Object.assign(this, options)
    }
}