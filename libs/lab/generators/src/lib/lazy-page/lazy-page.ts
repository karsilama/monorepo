import { Component } from "@angular/core";

@Component({
  selector: "lazy-page",
  template: `
    <h1>
      {{Hello, Im a lazy page}}
    </h1>
  `,
})
export class LazyPage {}
