import { httpResource } from "@angular/common/http";
import { Component, inject, input } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "../ product.model";
import { ButtonFilled } from "../../../core/button/button-filled";
import { ButtonDefinitions } from "../../../core/form/definitions/button-definition";
import { productAllUrl } from "../product.constant";

@Component({
  selector: "product-detail",
  templateUrl: "./product-detail.html",
  imports: [ButtonFilled],
})
export class ProductDetail {
  public router = inject(Router);

  public readonly id = input.required();

  public product = httpResource<Product>(() => ({
    url: `${productAllUrl}/${this.id()}`,
  }));

  public readonly backButton: ButtonDefinitions.Filled = {
    innerHtml: `Back`,
  };

  public backButtonHandler() {
    this.router.navigate([`product/all`]);
  }
}
