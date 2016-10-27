export const environment = {
  production: true,
  authentication: {
    authority: 'http://idp-teste.tjmt.jus.br',
    client_id: '2380',
    redirect_uri: 'http://localhost:5555/callback.html',
    post_logout_redirect_uri: 'http://localhost:5555/',
    response_type: 'code id_token token',
    scope: 'openid email roles',

    silent_redirect_uri: 'http://localhost:5555/silentrefreshframe.html',
    automaticSilentRenew: true,
    //silentRequestTimeout:10000,

    filterProtocolClaims: true,
    loadUserInfo: true
  }
};
