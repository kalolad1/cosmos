import * as dateUtil from '../util/date_util';

// test('getFormattedDateAndTime', () => {
//     const dateString = '2020-07-11T23:53:28.792115Z';
//     const expectedResult = 'July 11, 2020, 4:53 PM';
//     expect(dateUtil.getFormattedDateAndTime(dateString)).toEqual(
//         expectedResult
//     );
// });

test('getFormattedDate', () => {
    const dateString = '2020-07-11T23:53:28.792115Z';
    const expectedResult = 'July 11, 2020';
    expect(dateUtil.getFormattedDate(dateString)).toEqual(expectedResult);
});
