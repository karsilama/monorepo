import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ButtonDefinitions } from "../form/definitions/button-definition";

@Component({
  selector: "app-button",
  template: `
    <button
      [matButton]="options().type"
      [style.opacity.%]="options().disabled ? 20 : 100"
      [disabled]="options().disabled"
    >
      {{ options().innerHtml }}
    </button>
  `,
  imports: [MatButtonModule],
})
export class AppButton {
  public options = input.required<ButtonDefinitions>();
}
