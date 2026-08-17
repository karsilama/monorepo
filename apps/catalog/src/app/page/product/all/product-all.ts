import { httpResource } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { Router } from "@angular/router";
import { ProductsResponse } from "../ product.model";
import { ButtonFilled } from "../../../core/button/button-filled";
import { ButtonDefinitions } from "../../../core/form/definitions/button-definition";
import { productAllUrl } from "../product.constant";

@Component({
  selector: "product-all-page",
  templateUrl: "./product-all.html",
  imports: [MatListModule, ButtonFilled],
})
export class ProductAllPage {
  public router = inject(Router);

  public productAll = httpResource<ProductsResponse>(() => ({
    url: productAllUrl,
  }));

  public navigateButton = signal<ButtonDefinitions.Filled>({
    innerHtml: `View/Edit`,
  });

  public navigateTo(id: number) {
    this.router.navigate([`product/${id}`]);
  }
}
