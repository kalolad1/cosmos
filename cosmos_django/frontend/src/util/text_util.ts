export function capitalizeFirstLetter(str: string) {
    if (str === null) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getInitials(firstName: string, lastName: string): string {
    return firstName[0] + lastName[0];
}

export function createFullName(firstName: string, lastName: string): string {
    return firstName + ' ' + lastName;
}