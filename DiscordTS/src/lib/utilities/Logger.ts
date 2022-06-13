import { createLogger, format, transports, addColors } from "winston";
import chalk from "chalk";
const { combine, printf } = format;

const labelToColor = {
    INFO: `${chalk.cyanBright(`{{label}}`)}`,
    WARN: `${chalk.yellowBright(`{{label}}`)}`,
    ERROR: `${chalk.redBright(`{{label}}`)}`,
    HTTP: `${chalk.greenBright(`{{label}}`)}`,
    VERBOSE: `${chalk.blueBright(`{{label}}`)}`,
    SILLY: `${chalk.yellowBright(`{{label}}`)}`,
    DEBUG: `${chalk.cyanBright(`{{label}}`)}`,
};

const myFormat = printf(({ level, message, label, src, timestamp }) => {
    return `${chalk.gray(`${src} ~`)} [${labelToColor[
        label
    ].replace(`{{label}}`, label)}] (${timestamp}) ${message}`;
});

const myCustomLevels = {
    levels: {
        error: 0,
        warn: 1,
        info: 2,
        http: 3,
        verbose: 4,
        debug: 5,
        silly: 6,
    },
    colours: {
        error: `bold red`,
        warn: `bold yellow`,
        info: `bold blue`,
        http: `bold white`,
        verbose: `bold green`,
        debug: `bold cyan`,
    },
};

addColors(myCustomLevels.colours);

export default createLogger({
    levels: myCustomLevels.levels,
    format: combine(
        format.colorize(),
        format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
        myFormat
    ),
    transports: [new transports.Console()],
});