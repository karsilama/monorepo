import { Component, effect, inject, signal } from "@angular/core";
import { email, form, required } from "@angular/forms/signals";
import { Router } from "@angular/router";
import { ButtonFilled } from "../../core/button/button-filled";
import { CheckboxControl } from "../../core/form/controls/check-control";
import { TextControl } from "../../core/form/controls/text-control";
import { ButtonDefinitions } from "../../core/form/definitions/button-definition";
import { FormDefinitions } from "../../core/form/definitions/form-definitions";

interface SubmissionSchema {
  email: string;
  policies: boolean;
}

@Component({
  selector: "login",
  templateUrl: "./login.html",
  host: {
    style: "display: block; height: 100%;",
  },
  imports: [ButtonFilled, CheckboxControl, TextControl],
})
export class Login {
  public readonly router = inject(Router);

  public email = signal("some@email.com");
  public policies = signal(false);

  public schema = signal<SubmissionSchema>({
    email: this.email(),
    policies: this.policies(),
  });

  public readonly emailOptions: FormDefinitions.TextControl = {
    label: "Type your email",
  };

  public form = form<SubmissionSchema>(this.schema, (schema) => {
    required(schema.email, {
      message: "Email is required field",
    });
    email(schema.email, {
      message: "Email is invalid",
    });
    required(schema.policies, {
      message: "⚠️ Please, accept policies",
    });
  });

  public submitButton = signal<ButtonDefinitions.Filled>({
    innerHtml: "Send",
    disabled: true,
  });

  constructor() {
    effect(() => {
      const email = this.email();
      const policies = this.policies();
      const currentSchema = this.schema();

      if (
        email === currentSchema.email &&
        policies === currentSchema.policies
      ) {
        return;
      }

      this.schema.update((schema) => ({ email, policies }));
    });

    effect(() => {
      this.submitButton.update((x) => ({
        ...x,
        disabled:
          !!this.form.email().errors().length ||
          !!this.form.policies().errors().length,
      }));
    });
  }

  public submitHandler(): void {
    const value = this.form().value();
    console.log("::: Form submitted with value: ", value);
    this.router.navigate(["product"]);
  }
}
