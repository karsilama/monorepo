import { inject } from "@angular/core";
import { RedirectCommand, ResolveFn, Router } from "@angular/router";
import { catchError, of } from "rxjs";
import { Product } from "./ product.model";
import { ProductService } from "./product.service";

export const productAllResolver: ResolveFn<Product[]> = () => {
  const productService = inject(ProductService);
  const router = inject(Router);

  return productService
    .productAll()
    .pipe(
      catchError(() => of(new RedirectCommand(router.parseUrl("product")))),
    );
};
