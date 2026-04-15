import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  Injector,
  input,
  output,
} from "@angular/core";
import { List, ListRow } from "@lab/list-page/infrastructure";
import { LabList } from "@lab/list-page/ui";
import { LIST_ROW_CONTEXT } from "../list-page-token";

@Component({
  selector: "lab-list-page",
  imports: [LabList],
  host: {
    class: "flex flex-1 w-full md:max-w-[9200px] m-auto",
  },
  templateUrl: "./list-page.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPage {
  public data = input.required<List>();

  public computedData = computed(() => {
    const data = this.data();
    return {
      ...data,
      rows: data.rows.map((x) => ({
        ...x,
        injector: this.getInjector(x),
      })),
    };
  });

  public executed = output<ListRow>();

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
