import { Routes } from "@angular/router";
import { ProductAllPage } from "./all/product-all";
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
