import { IdentityTransformationService } from '../authentication/identity-transformation.service';
import { Identity, OpenIDConnectIdentity } from '../authentication/identity.model';

export class OidcIdentityTransformationService extends IdentityTransformationService<Oidc.User, OpenIDConnectIdentity> {
  public transform(user: Oidc.User): OpenIDConnectIdentity {
    let combinedIdentity = super.transform(user);
    combinedIdentity = super.transform(user.profile);

    combinedIdentity.id = user.profile.sub || null;
    combinedIdentity.displayName = user.profile.name || null;
    combinedIdentity.name = user.profile.name || null;
    combinedIdentity.email = user.profile.email || null;
    combinedIdentity.imageURL = user.profile.picture && user.profile.picture[0] || null;
    combinedIdentity.clientId = user.profile.client_id || null;
    combinedIdentity.accessToken = user.access_token || null;
    combinedIdentity.idToken = user.id_token || null;
    combinedIdentity.roles = user.profile.roles || null;

    delete user.profile;

    // const returnIdentity = Object.assign(combinedIdentity,
    //   {
    //     id: user.profile.sub || null,
    //     name: user.profile.name || null,
    //     email: user.profile.email || null,
    //     pictureUri: user.profile.picture && user.profile.picture[0] || null,
    //     client_id: user.profile.client_id || null,
    //     type: 'federated'
    //   });

    return combinedIdentity;
  }
}
