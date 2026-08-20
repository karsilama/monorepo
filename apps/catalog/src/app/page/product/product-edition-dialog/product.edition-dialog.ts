import { Component, inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInput } from "@angular/material/input";

@Component({
  selector: `product-edition-dialog`,
  templateUrl: `./product-edition-dialog.html`,
  imports: [MatFormFieldModule, MatInput],
})
export class ProductEditionDialog {
  public product = inject(MAT_DIALOG_DATA);
  constructor() {
    console.log(this.product);
  }
}
