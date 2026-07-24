import { ChangeDetectionStrategy, Component, output } from "@angular/core";
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
  public executed = output<string>();

  public onExecuted(e: string) {
    this.executed.emit(e);
  }
}
