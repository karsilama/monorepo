import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

const matModules = [MatButtonModule];
@Component({
  selector: 'app-home',
  imports: [matModules, RouterLink],
  template: ` <button mat-button routerLink="/users">Users page</button> `,
})
export class Home {}
