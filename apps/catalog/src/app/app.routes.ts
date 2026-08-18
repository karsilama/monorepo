import { Route } from "@angular/router";
import { Login } from "./page/login/login";

export const appRoutes: Route[] = [
  {
    path: "login",
    component: Login,
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
