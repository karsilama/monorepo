import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
  selector: "lazy-page",
  changeDetection: ChangeDetectionStrategy.Eager,
  template: `
    <h1>
      {{Hello, Im a lazy page}}
    </h1>
  `,
})
export class LazyPage {}
