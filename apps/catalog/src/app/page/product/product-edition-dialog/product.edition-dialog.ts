import { Component, inject, signal } from "@angular/core";
import { form, required } from "@angular/forms/signals";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";
import { Product } from "../ product.model";
import { ProductService } from "../product.service";

@Component({
  selector: `product-edition-dialog`,
  templateUrl: `./product-edition-dialog.html`,
  imports: [MatFormFieldModule, MatInput],
})
export class ProductEditionDialog {
  public product = inject(MAT_DIALOG_DATA);
  public productService = inject(ProductService);

  public readonly schema = signal({
    title: "",
    description: "",
    price: "",
  });

  public form = form(this.schema, (schema) => {
    required(schema.title);
    required(schema.description);
    required(schema.price);
  });

  public save() {
    const product = this.form().value as Partial<Product>;
    this.productService.save(product);
  }
}
