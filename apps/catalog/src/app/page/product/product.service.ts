import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "./ product.model";
import { productAllUrl } from "./product.constant";

@Service()
export class ProductService {
  private http = inject(HttpClient);

  public save(product: Partial<Product>): Observable<Partial<Product>> {
    return this.http.patch(`${productAllUrl}/${product.id}`, product);
  }
}
