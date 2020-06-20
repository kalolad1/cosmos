export function capitalizeFirstLetter(str: string) {
    if (str === null) {
        return '';
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
}