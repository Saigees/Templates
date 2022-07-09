// Built in HTTP server

import { Sleep } from "./sleep"
import chalk from "chalk"

const Serve = () => {
    console.log("Serving HTTP client.")
    Bun.serve({
        port: parseInt(process.env.PORT),
        fetch: (req: Request) => {
            return new Response("Hello World! Request type: "+req.method )
        }
    })
}

// FizzBuzz

const fizzBuzz = (num: number) => {
    if (num % 2 === 0) {
        console.log("fizz "+ num )
    } else {
        console.log("buzz " + num)
    }
}

const main = () => {
    for (let i = 1; i <= 10; i++) {
        fizzBuzz(i)
    }
}


// Executing functions

Serve()
console.log(chalk.gray(`Tip: Run "curl localhost${process.env.PORT}" to see its response`))

const started = Date.now()
main();

console.log('Running sleep function (5s)...')
Sleep(5).then(() => {
    console.log("Sleep ran for: " + (Date.now() - started) + "ms")
    console.log("Exiting script in 15s")
    Sleep(15).then(() => {
        process.exit(0)
    })
})
