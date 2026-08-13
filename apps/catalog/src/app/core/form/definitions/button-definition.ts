export namespace ButtonDefinitions {
  export interface ButtonBase {
    innerHtml: string;
    disabled?: boolean;
    executed?: () => void;
  }

  export interface Filled extends ButtonBase {}

  export type Buttons = Filled;
}
