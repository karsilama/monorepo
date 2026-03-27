import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AbstractButton } from './button.abstract';

@Component({
  selector: 'suite-button',
  imports: [MatIconModule, MatButtonModule],
  template: `
    <button
      matMiniFab
      aria-label="{{ arialLabel() }}"
      [color]="color()"
      (click)="onClick()"
    >
      @if (icon()) {
        <mat-icon>{{ icon() }}</mat-icon>
      }
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuiteMiniFabButton extends AbstractButton {
  public override onClick() {
    this.execute.emit();
  }
}
