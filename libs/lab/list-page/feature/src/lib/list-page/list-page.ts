import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { List, ListRow } from '@lab/list-page-infrastructure';
import { LabList } from '@lab/list-page/ui';

@Component({
  selector: 'lab-list-page',
  imports: [LabList],
  templateUrl: './list-page.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPage {
  public listItemContent = input();
  public data = input<List>();

  public executed = output<ListRow>();

  public onExecuted(e: ListRow) {
    this.executed.emit(e);
  }
}
