import { IAuthenticationService } from './authentication.service';
import { IdentityService } from './identity.service';


export abstract class ProviderAuthenticationService implements IAuthenticationService {
  public abstract login(): void;
  constructor(protected identityService: IdentityService) { }
  public logout(): void {
    this.identityService.unload();
  }
}
