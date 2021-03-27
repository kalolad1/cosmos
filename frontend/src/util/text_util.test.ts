import * as textUtil from '../util/text_util';

test('capitalizeFirstLetter', () => {
    expect(textUtil.capitalizeFirstLetter('john')).toEqual('John');
});

test('getInitials', () => {
    expect(textUtil.getInitials('John', 'Doe')).toEqual('JD');
});

test('createFullName', () => {
    expect(textUtil.createFullName('John', 'Doe')).toEqual('John Doe');
});
