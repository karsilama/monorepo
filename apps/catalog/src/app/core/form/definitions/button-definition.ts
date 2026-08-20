import { MatButtonAppearance } from "@angular/material/button";

export interface ButtonDefinitions {
  type: MatButtonAppearance;
  innerHtml: string;
  disabled?: boolean;
}
