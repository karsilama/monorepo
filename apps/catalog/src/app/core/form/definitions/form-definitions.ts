import { ValidatorFn } from "@angular/forms";

export namespace FormDefinitions {
  export interface BaseControl {
    label?: string;
  }

  export interface TextControl extends BaseControl {
    validators?: ValidatorFn | ValidatorFn[];
  }

  export interface CheckboxControl extends BaseControl {}

  export type Controls = Text | CheckboxControl;
}
