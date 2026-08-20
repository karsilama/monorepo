import { httpResource } from "@angular/common/http";
import { Component, computed, effect, inject, input } from "@angular/core";
import { Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
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
    if (!productId || isNaN(Number(productId))) {
      this.store.setError("Invalid ID");
    }

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

  public updateProduct(product: Product) {
    this.store.updateProduct(product);
  }

  public async save() {
    const product = this.store.product();

    if (!product) {
      if (!product) {
        this.store.setError("No product for update");
        return;
      }
      return;
    }

    try {
      const updatedProduct = await firstValueFrom(
        this.productService.save(product),
      );

      console.log("Product updated!!", updatedProduct);

      this.store.setProduct(updatedProduct);
      this.store.setSaving(false);
    } catch (error) {
      console.error("Error saving:", error);
      this.store.setError(
        error instanceof Error ? error.message : "Error saving product",
      );
      this.store.setSaving(false);
    }
  }

  public resetProduct() {
    const original = this.product.value();
    if (original) {
      this.store.resetProduct(original);
    }
  }

  public reloadProduct() {
    this.product.reload();
    this.store.setError(null);
  }
}
