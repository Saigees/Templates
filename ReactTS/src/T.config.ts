import figlet from "figlet";
import { CustomConfig } from "./typings";

//@ts-ignore
import Standard from "figlet/importable-fonts/Thin.js";

const config =  {
    title: `Saige`,
    about: `Github: https://github.com/Saigees/\nRepo: https://github.com/Saigees/Templates`,
    redirects: [{
        route: "/github",
        location: "https://github.com/Saigees/Templates"
    }]
} as CustomConfig

figlet.parseFont("Standard", Standard)
figlet(config.title, (err, result) => {
    console.log(`<${"=".repeat(40)}>${"\n".repeat(1)}${result}${"\n".repeat(2)}${config.about}${"\n".repeat(2)}<${"=".repeat(40)}>`)
})

export default config;