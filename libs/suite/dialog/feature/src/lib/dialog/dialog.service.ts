import { ComponentType } from '@angular/cdk/overlay';
import { inject, Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { Dialog } from './models';

@Injectable({
  providedIn: 'root',
})
export class DialogService<TData = unknown, TResult = unknown> {
  readonly matDialog = inject(MatDialog);
  private dialogs: Map<string, ComponentType<TData>> = new Map();
  private configs: Map<string, MatDialogConfig> = new Map();

  /***
   * Register dialog
   * @param payload Dialog data
   */
  public register(payload: Dialog<TData>) {
    this.dialogs.set(payload.id, payload.component);
    if (payload.configs) {
      this.configs.set(payload.id, payload.configs);
    }
  }

  /**
   * Open registered dialog
   * @param id Dialog ID
   * @param data Optional data
   * @returns MatDialogRef
   */

  public openDialog(id: string, data?: TData): MatDialogRef<TData, TResult> {
    const component = this.dialogs.get(id);

    if (!component) {
      throw new Error(`Dialog with id "${id}" not registered`);
    }

    const configs: MatDialogConfig = {
      ...this.configs.get(id),
      data: data || this.configs.get(id)?.data,
      disableClose: false,
      autoFocus: true,
      ...this.configs.get(id),
    };

    const dialogRef = this.matDialog.open(component, configs);

    return dialogRef;
  }
}
