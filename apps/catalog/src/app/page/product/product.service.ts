import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Product } from "./ product.model";
import { productAllUrl } from "./product.constant";

@Service()
export class ProductService {
  private http = inject(HttpClient);

  public save(
    id: number,
    product: Partial<Product>,
  ): Promise<Partial<Product>> {
    return firstValueFrom(this.http.patch(`${productAllUrl}/${id}`, product));
  }
}
