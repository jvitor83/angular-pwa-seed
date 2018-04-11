import { IdentityTransformationService } from '../authentication/identity-transformation.service';
import { OpenIDConnectIdentity } from '../authentication/identity.model';
import * as firebase from 'firebase/app';

export class FirebaseIdentityTransformationService extends IdentityTransformationService<firebase.User, OpenIDConnectIdentity> {
  public transform(user: firebase.User): OpenIDConnectIdentity {
    const combinedIdentity = super.transform(user);

    combinedIdentity.id = user.uid || null;
    combinedIdentity.displayName = user.displayName || null;
    combinedIdentity.name = user.displayName || null;
    combinedIdentity.email = user.email || null;
    combinedIdentity.imageURL = user.photoURL || null;
    combinedIdentity.clientId = (<any>user).w || null;
    combinedIdentity.isAuthenticated = !user.isAnonymous;
    user.getIdToken().then(value => {
      combinedIdentity.idToken = value;
    });
    user.getToken().then(token => {
      combinedIdentity.accessToken = token;
    });

    return combinedIdentity;
  }
}
