import { Component, model } from "@angular/core";
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from "@angular/material/checkbox";

@Component({
  selector: "checkbox-control",
  template: `
    <mat-checkbox
      [checked]="checked()"
      (change)="changeHandler($event)"
    ></mat-checkbox>
  `,
  imports: [MatCheckboxModule],
})
export class CheckboxControl {
  public readonly checked = model.required<boolean>();

  public changeHandler(e: MatCheckboxChange) {
    this.checked.set(e.checked);
  }
}
