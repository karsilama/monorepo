import { Component } from "@angular/core";
import { productAllFooterUrl } from "../product.constant";

@Component({
  selector: "product-all-footer",
  template: ` <footer>
    <img [src]="productAllFooterUrl" alt="Footer" aria-label="Footer image" />
  </footer>`,
})
export class LargeFooterComponent {
  public productAllFooterUrl = productAllFooterUrl;
}
