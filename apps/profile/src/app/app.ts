import { Location } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

const matModules = [MatButtonModule, MatCardModule, MatIconModule];
@Component({
  imports: [RouterModule, matModules],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Profile';

  public showBackButton = signal(false);

  private router = inject(Router);
  private location = inject(Location);

  private navigationEnd$ = toSignal(
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)),
    { initialValue: null }
  );

  /**
   * Go to the parent segment
   * * */
  public goBack() {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      const segments = this.router.url.split('/').filter(Boolean);
      if (segments.length > 0) {
        this.router.navigate([`/${segments[0]}`]);
      }
    }
  }

  constructor() {
    effect(() => {
      this.navigationEnd$();
      this.showBackButton.set(this.router.url !== '/');
    });
  }
}
