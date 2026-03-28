import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

const matModules = [MatButtonModule];
@Component({
  selector: 'app-home',
  imports: [matModules, RouterModule],
  template: ` <button matButton routerLink="/login">Goto Login</button> `,
})
export class Home {}
