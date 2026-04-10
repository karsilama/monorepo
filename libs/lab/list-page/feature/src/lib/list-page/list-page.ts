import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { List, ListRow } from '@lab/list-page/infrastructure';
import { LabList } from '@lab/list-page/ui';

@Component({
  selector: 'lab-list-page',
  imports: [LabList],
  host: {
    class: 'flex flex-1 w-full md:max-w-[9200px] m-auto',
  },
  templateUrl: './list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPage {
  public listItemContent = input();
  public data = input.required<List>();

  public executed = output<ListRow>();

  public onExecuted(e: ListRow) {
    this.executed.emit(e);
  }
}
