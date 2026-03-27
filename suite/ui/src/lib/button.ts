import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AbstractButton } from './button.abstract';

@Component({
  selector: 'suite-button',
  imports: [MatIconModule, MatButtonModule],
  template: `
    <button
      matButton
      aria-label="{{ arialLabel() }}"
      [color]="color()"
      (click)="onClick()"
    >
      @if (icon()) {
        <mat-icon>{{ icon() }}</mat-icon>
      }
      <ng-content> </ng-content>
    </button>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuiteButton extends AbstractButton {
  public override onClick() {
    this.execute.emit();
  }
}
