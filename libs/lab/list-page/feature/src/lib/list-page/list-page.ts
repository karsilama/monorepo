import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { LabMiniFabButton } from 'libs/lab/buttons/ui/src';
import { ListField, ListPageModel } from './list-page.model';

@Component({
  selector: 'lib-list-page',
  imports: [LabMiniFabButton, MatListModule],
  templateUrl: './list-page.html',
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListPage {
  public data = input<ListPageModel>();
  public executed = output<ListField>();
  public onClick(e: ListField) {
    this.executed.emit(e);
  }
}
