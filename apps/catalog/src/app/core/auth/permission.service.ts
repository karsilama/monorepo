import { Service, signal } from "@angular/core";

@Service()
export class PermissionService {
  public hasPermission = signal(true);
}
