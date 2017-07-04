// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.


export const environment = {
  production: false,
  authentication: {
    authority: 'https://accounts.google.com',
    client_id: '929544282709-8mkof7adolh13fnualb2f4f176mjd2ot.apps.googleusercontent.com',
    client_secret: '2F88K5gbFOUhUuhSl7Z-XbD9',
    redirect_uri: 'http://localhost:5555/callback.html',
    post_logout_redirect_uri: 'http://localhost:5555',
    response_type: 'code id_token token',
    scope: 'openid profile',

    silent_redirect_uri: 'http://localhost:5555/silentrefresh.html',
    automaticSilentRenew: true,
    //silentRequestTimeout:10000,

    filterProtocolClaims: true,
    loadUserInfo: true,

    metadata: {
      issuer: 'https://accounts.google.com',
      authorization_endpoint: 'https://accounts.google.com/o/oauth2/v2/auth',
      token_endpoint: 'https://www.googleapis.com/oauth2/v4/token',
      userinfo_endpoint: 'https://www.googleapis.com/oauth2/v3/userinfo',
      revocation_endpoint: 'https://accounts.google.com/o/oauth2/revoke',
      jwks_uri: 'https://www.googleapis.com/oauth2/v3/certs',
    }

  },
  firebase: {
    apiKey: "AIzaSyD6KmBFYg79TvPmow-gJwtnQv6M-LaTDPc",
    authDomain: "newagent-9a87c.firebaseapp.com",
    databaseURL: "https://newagent-9a87c.firebaseio.com",
    projectId: "newagent-9a87c",
    storageBucket: "newagent-9a87c.appspot.com",
    messagingSenderId: "555549514252"
  }
};
