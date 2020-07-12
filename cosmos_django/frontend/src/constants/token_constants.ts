/* Contains auth token constants. */
export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';

export const ACCESS_TOKEN_EXPIRY_KEY = 'accessTokenExpiryKey';
export const REFRESH_TOKEN_EXPIRY_KEY = 'refreshTokenExpiryKey';

// Keep lifetimes in sync with server set values.
// 5 minute lifetime, ms
export const ACCESS_TOKEN_LIFETIME = 300000;
// 1 day lifetime, ms
export const REFRESH_TOKEN_LIFETIME = 86400000;
