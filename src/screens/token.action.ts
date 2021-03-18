export const TOKEN_SET_TOKEN = 'TOKEN_SET_TOKEN';
export const TOKEN_CLEAR_TOKEN = 'TOKEN_CLEAR_TOKEN';

export const actionSetToken = (accessToken: string, accessTokenExpirationDate: string) => ({
  type: TOKEN_SET_TOKEN,
  value: {
    accessToken,
    accessTokenExpirationDate,
  },
});
