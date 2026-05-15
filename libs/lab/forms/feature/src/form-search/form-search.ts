import {
  ChangeDetectionStrategy,
  Component,
  effect,
  output,
  signal,
} from "@angular/core";
import { debounce, form } from "@angular/forms/signals";
import { LabFormTextControl } from "@lab/forms/ui";

@Component({
  selector: "lab-form-search",
  standalone: true,
  imports: [LabFormTextControl],
  templateUrl: "./form-search.html",
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabFormSearch {
  public control = signal<{ search: string }>({
    search: "",
  });

  public form = form(this.control, (schema) => {
    debounce(schema.search, 800);
  });

  public executed = output<string>();

  constructor() {
    effect(() => this.executed.emit(this.form().controlValue().search));
  }

  /**
   * Signal update
   */
  public onCLearField() {
    this.control.update((control) => ({ ...control, search: "" }));
  }
}
