import * as urlUtil from './url_util';

test('getUrlPathWithId', () => {
    const url = 'http://cosmosehr.com/users/:id';
    const expectedUrl = 'http://cosmosehr.com/users/1';
    expect(urlUtil.getUrlPathWithId(url, 1)).toEqual(expectedUrl);
});
