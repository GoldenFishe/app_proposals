export function formatDateTime(dateTime: string) {
    const dateTimeFormat: Record<string, "numeric"> = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric"
    };
    return new Intl.DateTimeFormat(undefined, dateTimeFormat).format(new Date(dateTime));
}