import { Component, input, output } from "@angular/core";
import { Field, FormField } from "@angular/forms/signals";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";

@Component({
  selector: "lab-form-text-control",
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormField],
  styles: `
    :host {
      display: block;
    }
  `,
  templateUrl: "./form-text-control.html",
})
export class LabFormTextControl {
  public readonly formField = input.required<Field<string, string | number>>();
  public readonly label = input.required<string>();
  public readonly placeholder = input.required<string>();
  public readonly hint = input.required<string>();
  public readonly iconSuffix = input<string>();
  public readonly showClearField = input<boolean>();
  public clearExecuted = output<void>();

  public onClearField() {
    console.log("click");
    this.clearExecuted.emit();
  }
}
