import { Credential } from '@openid/openyolo';
import { IdentityTransformationService } from '../authentication/identity-transformation.service';
import { OpenIDConnectIdentity } from '../authentication/identity.model';
import * as firebase from 'firebase/app';

export class YoloIdentityTransformationService extends IdentityTransformationService<Credential, OpenIDConnectIdentity> {
  public transform(user: Credential): OpenIDConnectIdentity {
    const combinedIdentity = super.transform(user);

    combinedIdentity.id = user.id || null;
    combinedIdentity.displayName = user.displayName || null;
    combinedIdentity.name = user.displayName || null;
    combinedIdentity.email = user.id || null;
    combinedIdentity.imageURL = user.profilePicture || null;
    combinedIdentity.clientId = (<any>user).w || null;
    combinedIdentity.accessToken = user.exchangeToken || user.idToken || null;
    combinedIdentity.idToken = user.idToken || null;
    combinedIdentity.roles = [];

    return combinedIdentity;
  }
}
