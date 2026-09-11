import { inject } from "@angular/core";
import { RedirectCommand, ResolveFn, Router } from "@angular/router";
import { Product } from "./ product.model";
import { ProductService } from "./product.service";

export const productAllResolver: ResolveFn<Product[]> = (route, state) => {
  const productService = inject(ProductService);
  const router = inject(Router);

  try {
    return productService.productAll();
  } catch {
    return new RedirectCommand(router.parseUrl("product"));
  }
};
