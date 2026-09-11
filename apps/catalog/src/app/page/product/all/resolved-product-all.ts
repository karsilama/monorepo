import { Component, computed, inject, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { MatListModule } from "@angular/material/list";
import { ActivatedRoute, Router } from "@angular/router";
import { AppButton } from "../../../core/button/button";
import { ButtonDefinitions } from "../../../core/form/definitions/button-definition";

@Component({
  selector: "resolved-product-all",
  templateUrl: "./resolved-product-all.html",
  imports: [MatListModule, AppButton],
})
export class ResolvedProductAll {
  public router = inject(Router);
  public route = inject(ActivatedRoute);

  public data = toSignal(this.route.data);

  public productAll = computed(() => this.data()?.["all"]["products"]);

  public navigateButton = signal<ButtonDefinitions>({
    innerHtml: `View/Edit`,
    type: `filled`,
  });

  public navigateTo(id: number) {
    this.router.navigate([`product/${id}`]);
  }
}
