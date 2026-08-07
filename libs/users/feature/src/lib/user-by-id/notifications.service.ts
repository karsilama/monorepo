import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";
import { firstValueFrom } from "rxjs";

export interface GetNotificationsResponse {
  notifications: number;
}

@Service()
export class StockService {
  public http = inject(HttpClient);
  public async getNotifications(id: string): Promise<string> {
    const { notifications } = await firstValueFrom(
      this.http.get<GetNotificationsResponse>(
        `https://dummyjson.com/products/${id}`,
      ),
    );
    return String(notifications);
  }
}
