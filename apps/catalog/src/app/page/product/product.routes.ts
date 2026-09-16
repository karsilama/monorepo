import { Routes } from "@angular/router";
import { ProductAll } from "./all/product-all";
import { productAllConfigurationResolver } from "./all/product-all-configuration.resolver";
import { canMatchDetailGuard } from "./can-match-detail.guard";
import { ProductDetail } from "./detail/product-detail";

export const productPageRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "all",
        component: ProductAll,
        resolve: {
          configuration: productAllConfigurationResolver,
        },
      },
      {
        path: ":id",
        canMatch: [canMatchDetailGuard],
        loadComponent: () => ProductDetail,
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "all",
      },
    ],
  },
];
