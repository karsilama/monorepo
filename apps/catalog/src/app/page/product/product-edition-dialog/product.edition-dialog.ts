import { Component, inject, signal } from "@angular/core";
import { form, FormField, FormRoot, required } from "@angular/forms/signals";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { ProductService } from "../product.service";
import { ProductStore } from "../product.store";

@Component({
  selector: `product-edition-dialog`,
  templateUrl: `./product-edition-dialog.html`,
  imports: [MatFormFieldModule, MatInput, FormRoot, FormField],
  providers: [ProductStore],
})
export class ProductEditionDialog {
  public product = inject(MAT_DIALOG_DATA);
  public productService = inject(ProductService);
  public productStore = inject(ProductStore);
  public dialogRef = inject(MatDialogRef<ProductEditionDialog>);

  public readonly schema = signal({
    title: this.product.title,
    description: this.product.description,
    price: this.product.price,
  });

  public editionForm = form(
    this.schema,
    (schema) => {
      required(schema.title);
      required(schema.description);
      required(schema.price);
    },
    {
      submission: {
        action: async (schema) => {
          const result = await this.productStore.save(
            this.product.id,
            schema().value(),
          );

          if (result?.id) {
            this.dialogRef.close();
            return;
          }

          return {
            kind: "serverError",
            message: "Error on submission edition form",
          };
        },
      },
    },
  );

  public cancel() {
    this.dialogRef.close();
  }
}
