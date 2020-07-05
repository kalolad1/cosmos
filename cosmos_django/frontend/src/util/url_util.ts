export function getUrlPathWithId(urlPath, id) {
    /* Gets a url path with the provided id interpolated. */
    return urlPath.replace(':id', id);
}
