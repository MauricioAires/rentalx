export default {
  secret_token: process.env.SECRET_TOKEN,
  expires_token: process.env.EXPIRES_TOKEN,
  secrete_refresh_token: process.env.SECRET_REFRESH_TOKEN,
  expires_refresh_token: process.env.EXPIRES_REFRESH_TOKEN,
  expires_refresh_token_days: Number(process.env.EXPIRES_REFRESH_TOKEN_DAYS),
};
