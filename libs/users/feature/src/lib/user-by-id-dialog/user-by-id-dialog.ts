import { Dialog } from "@angular/cdk/dialog";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from "@angular/core";
import {
  email,
  form,
  FormField,
  maxLength,
  required,
  validate,
} from "@angular/forms/signals";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { LabButton } from "@lab/buttons/ui";
import { Store } from "@ngrx/store";
import { saveUserById } from "@users/+state";

const emailPattern = new RegExp("\.com$");

@Component({
  selector: "users-user-by-id-dialog",
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "block m-20",
  },
  imports: [MatFormFieldModule, FormField, MatInputModule, LabButton],
  templateUrl: "./user-by-id-dialog.html",
})
export class UserEditDialog {
  private readonly data = inject(MAT_DIALOG_DATA);
  private store = inject(Store);
  private dialog = inject(Dialog);

  /**
   * User form model
   */

  public userModel = signal({
    firstName: this.data?.firstName ?? "",
    lastName: this.data?.lastName ?? "",
    email: this.data?.email ?? "",
  });

  /**
   * User form
   */
  public form = form(this.userModel, (schema) => {
    /**
     * Required fields
     */
    required(schema.email, { message: "Enter a valid email" });

    /**
     * Validators
     */
    email(schema.email, {
      message: "Enter a valid email address",
    });

    maxLength(schema.firstName, 200, {
      message: "Enter 200 characters length",
    });

    maxLength(schema.lastName, 200);

    validate(schema.email, ({ value }) => {
      return !emailPattern.test(value() as string)
        ? {
            message: "Email domain error found.",
            kind: "domain",
          }
        : null;
    });
  });

  public saveUser() {
    this.store.dispatch(
      saveUserById({
        formModel: this.userModel(),
      }),
    );
  }

  public cancel() {
    this.dialog.closeAll();
  }
}
