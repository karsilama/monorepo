import { Component, inject, signal } from "@angular/core";
import { form, FormField, FormRoot, required } from "@angular/forms/signals";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: `product-edition-dialog`,
  templateUrl: `./product-edition-dialog.html`,
  imports: [MatFormFieldModule, MatInput, FormRoot, FormField],
})
export class ProductEditionDialog {
  public data = inject(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<ProductEditionDialog>);

  public readonly schema = signal({
    title: this.data.product.title,
    description: this.data.product.description,
    price: this.data.product.price,
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
          const result = await this.data.store.save(
            this.data.product.id,
            schema().controlValue(),
          );

          this.dialogRef.close();

          if (result?.id) {
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
