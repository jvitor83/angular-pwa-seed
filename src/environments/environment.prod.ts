





export const environment = {
  production: true,
  authentication: {
    authority: 'https://accounts.google.com',
    client_id: '929544282709-8mkof7adolh13fnualb2f4f176mjd2ot.apps.googleusercontent.com',
    client_secret: '2F88K5gbFOUhUuhSl7Z-XbD9',
    redirect_uri: 'https://angular-pwa-seed.netlify.com/callback.html',
    post_logout_redirect_uri: 'https://angular-pwa-seed.netlify.com/',
    response_type: 'code id_token token',
    scope: 'openid profile',

    silent_redirect_uri: 'https://angular-pwa-seed.netlify.com/silentrefreshframe.html',
    automaticSilentRenew: true,
    //silentRequestTimeout:10000,

    filterProtocolClaims: true,
    loadUserInfo: true,
  }
};
