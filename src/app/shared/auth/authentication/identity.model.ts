import { Credential } from '@openid/openyolo';

export type Identity = Account &
  {
    isAuthenticated: boolean,
    email: string,
    roles: string[]
  };

export type OAuthIdentity = Identity &
  {
    accessToken: string,
    clientId: string,
  };

export type OpenIDConnectIdentity = OAuthIdentity &
  {
    idToken: string,
  };

export type OpenYoloIdentity = Credential;
