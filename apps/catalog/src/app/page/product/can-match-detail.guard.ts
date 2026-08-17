import { inject } from "@angular/core";
import { CanMatchFn } from "@angular/router";
import { PermissionService } from "../../core/auth/permission.service";

export const canMatchDetailGuard: CanMatchFn = (route, segments) => {
  const permissionService = inject(PermissionService);
  return permissionService.hasPermission();
};
