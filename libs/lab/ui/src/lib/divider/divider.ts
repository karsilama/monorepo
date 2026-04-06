import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDivider } from '@angular/material/divider';

@Component({
  selector: 'lab-divider',
  imports: [MatDivider],
  template: `<mat-divider></mat-divider>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Divider {}
