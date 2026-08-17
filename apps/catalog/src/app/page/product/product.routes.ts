import { Routes } from "@angular/router";
import { ProductAllPage } from "./all/product-all";
import { canMatchDetailGuard } from "./can-match-detail.guard";
import { ProductDetailPage } from "./detail/product-detail";

export const productPageRoutes: Routes = [
  {
    path: "",
    children: [
      {
        path: "all",
        component: ProductAllPage,
      },
      {
        path: ":id",
        canMatch: [canMatchDetailGuard],
        loadComponent: () => ProductDetailPage,
      },
      {
        path: "",
        pathMatch: "full",
        redirectTo: "all",
      },
    ],
  },
];
