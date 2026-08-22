import { httpResource } from "@angular/common/http";
import { Component, computed, effect, inject, input } from "@angular/core";
import { Router } from "@angular/router";
import { Product } from "../ product.model";
import { AppButton } from "../../../core/button/button";
import { DialogService } from "../../../core/dialog/dialog.service";
import { ButtonDefinitions } from "../../../core/form/definitions/button-definition";
import { ProductEditionDialog } from "../product-edition-dialog/product.edition-dialog";
import { productAllUrl } from "../product.constant";
import { ProductService } from "../product.service";
import { ProductStore } from "../product.store";

export const PRODUCT_EDITION_DIALOG_ID = "product-edition-dialog-id";

@Component({
  selector: "product-detail",
  templateUrl: "./product-detail.html",
  imports: [AppButton],
  providers: [ProductStore],
})
export class ProductDetail {
  public router = inject(Router);

  public store = inject(ProductStore);
  public productService = inject(ProductService);
  public dialogService = inject(DialogService);

  public readonly id = input.required<string>();

  /**
   * Preserve initial value
   */
  public product = httpResource<Product>(() => ({
    url: `${productAllUrl}/${this.id()}`,
  }));

  /**
   * Back button check
   */

  public readonly hasChanges = computed(() => {
    const original = this.product.value();
    const draft = this.store.product();

    if (!original || !draft) return false;
    return JSON.stringify(original) !== JSON.stringify(draft);
  });

  public readonly backButton: ButtonDefinitions = {
    innerHtml: `Back`,
    type: `filled`,
  };

  public readonly editButton: ButtonDefinitions = {
    innerHtml: `Edit`,
    type: `filled`,
  };

  constructor() {
    // Update handler
    effect(() => {
      const product = this.product.value();
      if (product) {
        this.store.setProduct(product);
      }
    });

    // Error Handler
    effect(() => {
      const error = this.product.error();
      if (error) {
        this.store.setError(error.message || "Error detected");
      }
    });

    // Loading handler
    effect(() => {
      this.store.setLoading(this.product.isLoading());
    });
  }

  public ngOnInit() {
    const productId = this.id();
    console.log(productId);
    if (!productId || isNaN(Number(productId))) {
      this.store.setError("URL Invalid - not product id found");
    }

    /**
     *
     * Product edition dialog registration
     * */
    this.dialogService.register({
      id: PRODUCT_EDITION_DIALOG_ID,
      component: ProductEditionDialog,
    });
  }

  public editButtonHandler() {
    this.dialogService.openDialog(
      PRODUCT_EDITION_DIALOG_ID,
      this.store.product(),
    );
  }

  public backButtonHandler() {
    if (this.hasChanges()) {
      const confirm = window.confirm("There are pending changes");
      if (!confirm) return;
    }
    this.router.navigate([`product/all`]);
  }
}
