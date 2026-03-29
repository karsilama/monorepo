import { Dialog } from '@angular/cdk/dialog';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import {
  email,
  form,
  FormField,
  maxLength,
  required,
} from '@angular/forms/signals';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngrx/store';
import { SuiteButton } from '@suite/buttons/ui';
import { saveUserById } from 'libs/users/+state/src';

@Component({
  selector: 'users-edit-dialog',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    style: 'display:block; margin: 20px',
  },
  imports: [MatFormFieldModule, FormField, MatInputModule, SuiteButton],
  templateUrl: './edit-dialog.html',
})
export class UserEditDialog {
  private readonly data = inject(MAT_DIALOG_DATA);
  private store = inject(Store);
  private dialog = inject(Dialog);

  /**
   * User form model
   */

  public userModel = signal({
    firstName: this.data?.firstName ?? '',
    lastName: this.data?.lastName ?? '',
    email: this.data?.email ?? '',
  });

  /**
   * User form
   */
  public form = form(this.userModel, (schema) => {
    /**
     * Required fields
     */
    required(schema.email, { message: 'Enter a valid email' });

    /**
     * Validators
     */
    email(schema.email, {
      message: 'Enter a valid email address',
    });

    maxLength(schema.firstName, 200, {
      message: 'Enter 200 characters length',
    });

    maxLength(schema.lastName, 200);
  });

  public saveUser() {
    debugger;
    this.store.dispatch(
      saveUserById({
        user: this.userModel(),
      }),
    );
  }

  public cancel() {
    this.dialog.closeAll();
  }
}
