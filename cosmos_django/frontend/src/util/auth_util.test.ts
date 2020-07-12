import * as authUtil from './auth_util';
import * as tokenConstants from '../constants/token_constants';

afterEach(() => {
    authUtil.clearTokens();
});

test('getAuthorizationRequestHeaders', () => {
    authUtil.setToken(tokenConstants.ACCESS_TOKEN, '123');
    const expectedHeaders = {
        headers: {
            Authorization: 'Bearer 123',
        },
    };
    expect(authUtil.getAuthorizationRequestHeaders()).toEqual(expectedHeaders);
});

test('getAuthorizationRequestHeaders, throws error', () => {
    expect(() => {
        authUtil.getAuthorizationRequestHeaders();
    }).toThrow('Access token not set.');
});

test('getBearerToken', () => {
    authUtil.setToken(tokenConstants.ACCESS_TOKEN, '123');
    const expectedBearerToken = 'Bearer 123';

    expect(authUtil.getBearerToken()).toEqual(expectedBearerToken);
});

test('getBearerToken, throws error', () => {
    expect(() => {
        authUtil.getBearerToken();
    }).toThrow('Access token not set.');
});

test('setToken, access token', () => {
    const now = new Date(2020, 7, 3, 7, 25, 0, 0);

    const expectedExpiration =
        now.getTime() + tokenConstants.ACCESS_TOKEN_LIFETIME;

    authUtil.setToken(tokenConstants.ACCESS_TOKEN, '123', now);

    expect(localStorage.getItem(tokenConstants.ACCESS_TOKEN)).toEqual('123');
    expect(
        localStorage.getItem(tokenConstants.ACCESS_TOKEN_EXPIRY_KEY)
    ).toEqual(expectedExpiration.toString());
});

test('setToken, refresh token', () => {
    const now = new Date(2020, 7, 3, 7, 25, 0, 0);

    const expectedExpiration =
        now.getTime() + tokenConstants.REFRESH_TOKEN_LIFETIME;

    authUtil.setToken(tokenConstants.REFRESH_TOKEN, '123', now);

    expect(localStorage.getItem(tokenConstants.REFRESH_TOKEN)).toEqual('123');
    expect(
        localStorage.getItem(tokenConstants.REFRESH_TOKEN_EXPIRY_KEY)
    ).toEqual(expectedExpiration.toString());
});

test('hasToken, returns true', () => {
    authUtil.setToken(tokenConstants.ACCESS_TOKEN, '123');
    authUtil.setToken(tokenConstants.REFRESH_TOKEN, '123');
    expect(authUtil.hasTokens()).toBeTruthy();
});

test('hasToken, returns false', () => {
    expect(authUtil.hasTokens()).toBeFalsy();
});

test('clearTokens', () => {
    authUtil.setToken(tokenConstants.ACCESS_TOKEN, '123');
    authUtil.setToken(tokenConstants.REFRESH_TOKEN, '123');

    authUtil.clearTokens();

    expect(localStorage.getItem(tokenConstants.ACCESS_TOKEN)).toBeNull();
    expect(
        localStorage.getItem(tokenConstants.REFRESH_TOKEN_EXPIRY_KEY)
    ).toBeNull();
    expect(localStorage.getItem(tokenConstants.REFRESH_TOKEN)).toBeNull();
    expect(
        localStorage.getItem(tokenConstants.REFRESH_TOKEN_EXPIRY_KEY)
    ).toBeNull();
});
