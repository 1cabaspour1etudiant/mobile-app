export const TOKENS_SET_TOKENS = 'TOKENS_SET_TOKENS';
export const TOKENS_CLEAR_TOKENS = 'TOKENS_CLEAR_TOKENS';

export const actionSetTokens = (accessToken: string, accessTokenExpirationDate: string, refreshToken: string) => ({
  type: TOKENS_SET_TOKENS,
  value: {
    accessToken,
    accessTokenExpirationDate,
    refreshToken,
  },
});
