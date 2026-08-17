import { httpResource } from "@angular/common/http";
import { Component, input } from "@angular/core";
import { Product } from "../ product.model";
import { productAllUrl } from "../product.constant";

@Component({
  selector: "product-detail-page",
  templateUrl: "./product-detail.html",
  imports: [],
})
export class ProductDetailPage {
  public readonly id = input.required();

  public product = httpResource<Product>(() => ({
    url: `${productAllUrl}/${this.id()}`,
  }));
}
