import { Route } from "@angular/router";
import { LoginPage } from "./page/login-page/login-page";

export const appRoutes: Route[] = [
  {
    path: "login",
    component: LoginPage,
  },
  {
    path: "product",
    loadChildren: () =>
      import("./page/product/product-page.module").then(
        (x) => x.ProductPageModule,
      ),
  },
  {
    path: "",
    pathMatch: "full",
    redirectTo: "login",
  },
];
