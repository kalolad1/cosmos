import * as axiosConfig from './axios_config';
import * as tokenConstants from '../constants/token_constants';
import * as authUtil from '../util/auth_util';

test('areTokensFresh, returns true access token is fresh', () => {
    // Fresh
    const accessTokenSetTime = new Date(2020, 7, 1, 1, 26, 0, 0);
    authUtil.setToken(tokenConstants.ACCESS_TOKEN, '123', accessTokenSetTime);

    // Fresh
    const currentTime = new Date(2020, 7, 1, 1, 30, 0, 0);
    return axiosConfig.areTokensFresh(currentTime).then(function (response) {
        expect(response).toBeTruthy();
    });
});

test('areTokensFresh, returns true refresh token is fresh', () => {
    // Expired
    const accessTokenSetTime = new Date(2020, 7, 1, 1, 25, 0, 0);
    authUtil.setToken(tokenConstants.ACCESS_TOKEN, '123', accessTokenSetTime);

    // Fresh
    const refreshTokenSetTime = new Date(2020, 7, 1, 7, 25, 0, 0);
    authUtil.setToken(tokenConstants.REFRESH_TOKEN, '123', refreshTokenSetTime);

    const currentTime = new Date(2020, 7, 1, 1, 31, 0, 0);
    const refreshTokenResponse = {
        data: {
            access: '123',
        },
    };
    // @ts-ignore
    authUtil.refreshAccessToken = jest.fn(() =>
        Promise.resolve(refreshTokenResponse)
    );
    return axiosConfig.areTokensFresh(currentTime).then(function (response) {
        expect(response).toBeTruthy();
    });
});

test('areTokensFresh, returns false both tokens stale', () => {
    // Expired
    const accessTokenSetTime = new Date(2020, 7, 5, 1, 25, 0, 0);
    authUtil.setToken(tokenConstants.ACCESS_TOKEN, '123', accessTokenSetTime);

    // Expired
    const refreshTokenSetTime = new Date(2020, 7, 3, 7, 25, 0, 0);
    authUtil.setToken(tokenConstants.REFRESH_TOKEN, '123', refreshTokenSetTime);

    const currentTime = new Date(2020, 7, 5, 1, 31, 0, 0);
    const refreshTokenResponse = {
        data: {
            access: '123',
        },
    };
    // @ts-ignore
    authUtil.refreshAccessToken = jest.fn(() =>
        Promise.resolve(refreshTokenResponse)
    );
    return axiosConfig.areTokensFresh(currentTime).then(function (response) {
        expect(response).toBeFalsy();
    });
});
