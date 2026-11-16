import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";

@Component({
  selector: "product-scroll-testing",
  templateUrl: "./scroll-testing.html",
  imports: [RouterLink],
})
export class ScrollTesting {
  public readonly ids = Array.from({ length: 100 }, (_, index) => index + 1);
}
