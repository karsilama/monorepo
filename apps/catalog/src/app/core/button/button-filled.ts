import { Component, input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { ButtonDefinitions } from "../form/definitions/button-definition";

@Component({
  selector: "button-filled",
  template: `
    <button
      mat-button
      [style.opacity.%]="options().disabled ? 20 : 100"
      [disabled]="options().disabled"
    >
      {{ options().innerHtml }}
    </button>
  `,
  imports: [MatButtonModule],
})
export class ButtonFilled {
  public options = input.required<ButtonDefinitions.Filled>();
}
