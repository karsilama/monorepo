import { Route } from "@angular/router";
import { LoginPage } from "./page/login-page/login-page";

export const appRoutes: Route[] = [
  {
    path: "login",
    component: LoginPage,
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
];
