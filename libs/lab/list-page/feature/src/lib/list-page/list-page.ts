import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  input,
  linkedSignal,
  output,
  signal,
} from "@angular/core";
import { LabFormSearch } from "@lab/forms/feature";
import { List, ListRow } from "@lab/list-page/infrastructure";
import { LabList } from "@lab/list-page/ui";
import { LIST_ROW_CONTEXT } from "../list-page-token";

@Component({
  selector: "lab-list-page",
  imports: [LabList, LabFormSearch],
  host: {
    class: "flex flex-1 w-full md:max-w-[920px] m-auto",
  },
  templateUrl: "./list-page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabListPage {
  public searchTerm = signal<string>("");

  public data = input.required<List>();

  /**
   * Add injector context for each frow
   */

  public computedData = computed<List>(() => {
    const data = this.data();
    return {
      ...data,
      rows: data.rows.map((x) => ({
        ...x,
        injector: this.getInjector(x),
      })),
    };
  });

  /**
   * Derivate signal by filtering rows
   */

  public filteredData = linkedSignal<List>(() => {
    const computedData = this.computedData();
    return {
      ...computedData,
      rows: computedData.rows.filter((x) =>
        x.lines.some((line) =>
          new RegExp(this.searchTerm(), "i").test(line.value?.toLowerCase()),
        ),
      ),
    };
  });

  public executed = output<ListRow>();

  public onSearchChanges(e: string) {
    this.searchTerm.set(e);
  }

  public onExecuted(e: ListRow) {
    this.executed.emit(e);
  }

  private injector = inject(Injector);

  /**
   * Actual row metadata for providing context to the shadow component
   * */

  private getInjector(row: ListRow) {
    return Injector.create({
      providers: [{ provide: LIST_ROW_CONTEXT, useValue: row.metadata }],
      parent: this.injector,
    });
  }
}
