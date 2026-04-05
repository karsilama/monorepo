import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'lab-list-page',
  imports: [],
  templateUrl: './list.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class List {}
