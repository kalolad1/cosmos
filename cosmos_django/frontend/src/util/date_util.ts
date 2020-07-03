export function getFormattedDateAndTime(dateTimeString: string): string {
    const dateStringOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    return new Date(dateTimeString).toLocaleTimeString(
        'en-us',
        dateStringOptions
    );
}

export function getFormattedDate(dateTimeString: string): string {
    const dateStringOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    };
    return new Date(dateTimeString).toLocaleTimeString(
        'en-US',
        dateStringOptions
    );
}
