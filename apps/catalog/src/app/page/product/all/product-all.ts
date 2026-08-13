import { Component, inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { ButtonFilled } from "../../../core/button/button-filled";
import { ButtonDefinitions } from "../../../core/form/definitions/button-definition";

@Component({
  selector: "product-all-page",
  templateUrl: "./product-all.html",
  imports: [ButtonFilled],
})
export class ProductAllPage {
  public router = inject(Router);

  public navigateButton = signal<ButtonDefinitions.Filled>({
    innerHtml: "Navigate to product id 1",
  });

  public navigateButtonHandler() {
    this.router.navigate(["product/1"]);
  }
}
