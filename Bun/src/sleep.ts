export const Sleep = (seconds: number) => {
    return new Promise((res) => {
        return setTimeout(res, seconds * 1000)
    })
}