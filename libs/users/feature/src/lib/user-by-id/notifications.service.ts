import { HttpClient } from "@angular/common/http";
import { inject, Service } from "@angular/core";

export interface GetNotificationsResponse {
  stock: number;
}

@Service()
export class NotificationService {
  public http = inject(HttpClient);
  public getNotifications(id: string) {
    return this.http.get<GetNotificationsResponse>(
      `https://dummyjson.com/products/${id}`,
    );
  }
}
