import { JsonPipe } from "@angular/common";
import { httpResource } from "@angular/common/http";
import { Component, inject, signal } from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { ActivatedRoute, Router } from "@angular/router";
import { PushPipe } from "@ngrx/component";
import { ProductsResponse } from "../ product.model";
import { AppButton } from "../../../core/button/button";
import { ButtonDefinitions } from "../../../core/form/definitions/button-definition";
import { productAllUrl } from "../product.constant";

@Component({
  selector: "product-all",
  templateUrl: "./product-all.html",
  imports: [MatListModule, AppButton, PushPipe, JsonPipe],
})
export class ProductAll {
  public router = inject(Router);
  public route = inject(ActivatedRoute);

  public configuration = this.route.data;

  public productAll = httpResource<ProductsResponse>(() => ({
    url: productAllUrl,
  }));

  public navigateButton = signal<ButtonDefinitions>({
    innerHtml: `View/Edit`,
    type: `filled`,
  });

  public navigateTo(id: number) {
    this.router.navigate([`product/${id}`]);
  }
}
