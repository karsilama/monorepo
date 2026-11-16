import { Routes } from "@angular/router";
import { ProductAll } from "./all/product-all";
import { productAllConfigurationResolver } from "./all/product-all-configuration.resolver";
import { canMatchDetailGuard } from "./can-match-detail.guard";
import { ProductDetail } from "./detail/product-detail";
import { ScrollTesting } from "./scroll-testing/scroll-testing";
import { ScrollTestingDetail } from "./scroll-testing/scroll-testing-detail";

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
        path: "scroll-testing",
        component: ScrollTesting,
      },
      {
        path: "scroll-testing-detail/:id",
        component: ScrollTestingDetail,
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
