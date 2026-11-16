import { Component, input } from "@angular/core";

@Component({
  selector: "product-scroll-testing-detail",
  templateUrl: "./scroll-testing-detail.html",
})
export class ScrollTestingDetail {
  public readonly id = input<string>("id");
}
