import { Injectable } from '@angular/core';
import { Identity } from './identity.model';

@Injectable()
export class IdentityTransformationService<SourceIdentity, DestinationIdentity extends Identity> {

  constructor() { }

  public transform(user: SourceIdentity): DestinationIdentity {
    const destinationIdentity: DestinationIdentity = <any>{};
    const combinedIdentity = Object.assign(destinationIdentity, user);
    combinedIdentity.isAuthenticated = true;
    return combinedIdentity;
  }
}

