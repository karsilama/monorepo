import { ComponentType } from '@angular/cdk/overlay';
import { MatDialogConfig } from '@angular/material/dialog';

export interface Dialog<T> {
  id: string;
  opened?: boolean;
  configs?: MatDialogConfig;
  component: ComponentType<T>;
}
