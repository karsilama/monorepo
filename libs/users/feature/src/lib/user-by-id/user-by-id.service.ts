import { httpResource } from "@angular/common/http";
import { Service } from "@angular/core";

@Service()
export class UserByIdService {
  public status = httpResource(() => "https://dummyjson.com/products/1", {
    defaultValue: null,
  });
}
