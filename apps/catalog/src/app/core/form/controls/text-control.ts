import { Component, model } from "@angular/core";
import { MatInputModule } from "@angular/material/input";
import { FormDefinitions } from "../definitions/form-definitions";

@Component({
  selector: "text-control",
  template: `
    <mat-form-field>
      <mat-label>{{ options().label }}</mat-label>
      <input matInput type="text" [value]="value()" (input)="onInput($event)" />
    </mat-form-field>
  `,
  imports: [MatInputModule],
})
export class TextControl {
  public readonly value = model.required<string>();
  public readonly options = model.required<FormDefinitions.TextControl>();

  public onInput(e: InputEvent) {
    const value = (e.target as HTMLInputElement).value;
    this.value.set(value);
  }
}
