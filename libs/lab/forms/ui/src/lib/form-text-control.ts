import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from "@angular/core";
import { form, FormField } from "@angular/forms/signals";
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
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: "./form-text-control.html",
})
export class LabFormTextControl {
  public readonly label = input.required<string>();
  public readonly placeholder = input.required<string>();
  public readonly hint = input.required<string>();
  public readonly iconSuffix = input<string>();
  public readonly showClearField = input<boolean>();

  public onExecuted = output<string>();

  public formSchema = signal({
    inputValue: "",
  });

  public form = form(this.formSchema, (schema) => {});

  constructor() {
    effect(() => this.onExecuted.emit(this.form().value().inputValue));
  }

  public onClearField() {
    this.form().reset();
  }
}
