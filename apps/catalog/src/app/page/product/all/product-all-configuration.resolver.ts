import { inject } from "@angular/core";
import { RedirectCommand, ResolveFn, Router } from "@angular/router";
import { catchError, of } from "rxjs";
import { ProductAllConfiguration } from "../ product.model";
import { ProductService } from "../product.service";

export const productAllConfigurationResolver: ResolveFn<
  ProductAllConfiguration
> = () => {
  const productService = inject(ProductService);
  const router = inject(Router);

  return productService
    .productAll()
    .pipe(
      catchError(() => of(new RedirectCommand(router.parseUrl("product")))),
    );
};
