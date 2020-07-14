import * as urlUtil from './url_util';

test('getUrlPathWithId', () => {
    const url = 'http://cosmosehr.com/users/:id';
    const expectedUrl = 'http://cosmosehr.com/users/1';
    expect(urlUtil.getUrlPathWithId(url, 1)).toEqual(expectedUrl);
});

test('getUrlPathWithQueryParams', () => {
    const url = 'http://cosmosehr.com/home/search';
    const query = 'John Doe';

    const expectedUrl = 'http://cosmosehr.com/home/search?q=John%20Doe';
    expect(urlUtil.getUrlPathWithQueryParams(url, query)).toEqual(expectedUrl);
});
