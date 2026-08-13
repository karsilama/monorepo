import { NgModule } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { productPageRoutes } from "./product.routes";

@NgModule({
  providers: [provideRouter(productPageRoutes, withComponentInputBinding())],
})
export class ProductPageModule {}
