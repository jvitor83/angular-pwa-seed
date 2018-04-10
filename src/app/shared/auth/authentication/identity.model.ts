 import { Credential } from '@openid/openyolo';

// // Will use the Credential interface as default.
// // I think it is the best and standarlized way to get user informations, since it is based on OpenYolo Spec.

// // tslint:disable-next-line:no-empty-interface
// export interface Identity extends Credential {
//   isAuthenticated: boolean;
// }

// import { Credential } from 'webappsec-credential-management';

// /// <reference path="../../../../../node_modules/@types/webappsec-credential-management/index.d.ts" />

// export type Identity = Credential & { isAuthenticated: boolean };
export type Identity = Account &
{
  isAuthenticated: boolean,
  email: string,
  roles: string[]
};

export type OAuthIdentity = Identity & {
  accessToken: string,
  clientId: string,
};

export type OpenIDConnectIdentity = OAuthIdentity & {
  idToken: string,
};

export type OpenYoloIdentity = Credential;
