import { Component, input } from "@angular/core";

@Component({
  selector: "product-detail-page",
  templateUrl: "./product-detail.html",
  imports: [],
})
export class ProductDetailPage {
  public readonly id = input.required();
}
