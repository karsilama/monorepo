import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { Product } from "./ product.model";
import { productAllUrl } from "./product.constant";

export type PatchResponse = Product | Error;

@Service()
export class ProductService {
  private http = inject(HttpClient);

  public async patchProduct(product: Product): Promise<PatchResponse> {
    try {
      const result = await firstValueFrom(
        this.http.patch(`${productAllUrl}/${product.id}`, product),
      );
      return result as Product;
    } catch {
      return new Error("Error: method not supported. Product not stored");
    }
  }
}
