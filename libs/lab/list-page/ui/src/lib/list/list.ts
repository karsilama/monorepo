import { NgComponentOutlet } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from "@angular/core";
import { MatListModule } from "@angular/material/list";
import { LabMiniFabButton } from "@lab/buttons/ui";
import { List, ListRow } from "@lab/list-page/infrastructure";
@Component({
  selector: "lab-list",
  imports: [MatListModule, NgComponentOutlet, LabMiniFabButton],
  templateUrl: "./list.html",
  host: {
    class: "flex flex-1 h-full",
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabList {
  public data = input.required<List>();

  public lines = computed(() => {
    const data = this.data();
    return !!data?.rows.length ? data.rows[0].lines : [];
  });

  public executed = output<ListRow>();

  public onClick(e: ListRow) {
    this.executed.emit(e);
  }
}
