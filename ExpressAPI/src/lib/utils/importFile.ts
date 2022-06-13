export default async (filePath: string) => {
    return await(await import(filePath)).default;
}