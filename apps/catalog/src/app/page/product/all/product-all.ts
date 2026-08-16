import { httpResource } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { Router } from "@angular/router";
import { ProductResource } from "../ product.model";
import { ButtonFilled } from "../../../core/button/button-filled";
import { ButtonDefinitions } from "../../../core/form/definitions/button-definition";
import { ProductAll } from "../product.constant";

@Component({
  selector: "product-all-page",
  templateUrl: "./product-all.html",
  imports: [ButtonFilled, MatListModule],
})
export class ProductAllPage {
  public router = inject(Router);

  public productAll = httpResource<ProductResource>(() => ProductAll);

  public navigateButton = signal<ButtonDefinitions.Filled>({
    innerHtml: "Navigate to product id 1",
  });

  public navigateButtonHandler() {
    this.router.navigate(["product/1"]);
  }
}
