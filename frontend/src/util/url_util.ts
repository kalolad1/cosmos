export function getUrlPathWithId(urlPath: string, id) {
    /* Gets a url path with the provided id interpolated. */
    return urlPath.replace(':id', id);
}

/**
 * Returns a url with query params in it.
 *
 * @param urlPath - The url path to add query params to.
 * @param query - The query.
 *
 * @returns
 * A url with query params added to it.
 */
export function getUrlPathWithQueryParams(
    urlPath: string,
    query: string
): string {
    const queryPrefix = '?q=';
    const urlQuery = query.replace(' ', '%20');
    return urlPath + queryPrefix + urlQuery;
}
