import { Injectable } from '@angular/core';
import { IdentityService } from '../authentication/identity.service';


@Injectable()
export class AuthorizationService {
  constructor(protected identityService: IdentityService) {
  }

  public checkClaimPermission(claimName: string, claimValue?: string): boolean {
    const user = this.identityService.userValue;
    const userHasClaim = user.hasOwnProperty(claimName);
    if (!userHasClaim) {
      return false;
    }
    if (claimValue) {
      const userClaimValue = user[claimName];
      if (userClaimValue === claimValue) {
        return true;
      }
    } else {
      return true;
    }
    return false;
  }
}
