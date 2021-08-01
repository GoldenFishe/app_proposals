export function getDataFromEnvironment(field: string, required: boolean = true): string | never {
    const data = process.env[field];
    if (data === undefined && required) {
        throw new Error(`${field} doesn't exist in environment`);
    } else {
        return data as string;
    }
}