import { provideHttpClient } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { productPageRoutes } from "./product.routes";

@NgModule({
  providers: [
    provideHttpClient(),
    provideRouter(productPageRoutes, withComponentInputBinding()),
  ],
})
export class ProductPageModule {}
