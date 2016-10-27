// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
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
