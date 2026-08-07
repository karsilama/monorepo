import { HttpClient } from "@angular/common/http";
import {
  inject,
  Injector,
  runInInjectionContext,
  Service,
} from "@angular/core";
import { firstValueFrom } from "rxjs";
import { USER_ID } from "../users-feature.module";

export interface GetStockResponse {
  stock: number;
}

@Service()
export class StockService {
  public async getStock(injector: Injector): Promise<string> {
    return runInInjectionContext(injector, async () => {
      const id = inject(USER_ID);
      const http = inject(HttpClient);
      console.log("::::: ID", id);
      const { stock } = await firstValueFrom(
        http.get<GetStockResponse>(`https://dummyjson.com/products/${id}`),
      );

      return String(stock);
    });
  }
}
