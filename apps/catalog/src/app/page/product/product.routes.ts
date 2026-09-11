import { Routes } from "@angular/router";
import { ProductAll } from "./all/product-all";
import { ResolvedProductAll } from "./all/resolved-product-all";
import { canMatchDetailGuard } from "./can-match-detail.guard";
import { ProductDetail } from "./detail/product-detail";
import { productAllResolver } from "./product-all.resolver";

export const productPageRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "all",
        component: ProductAll,
      },
      {
        path: "resolve-all",
        component: ResolvedProductAll,
        resolve: {
          all: productAllResolver,
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
