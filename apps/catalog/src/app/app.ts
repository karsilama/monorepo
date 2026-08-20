import {
  Component,
  computed,
  DOCUMENT,
  effect,
  inject,
  Renderer2,
  signal,
} from "@angular/core";
import { MatButtonAppearance } from "@angular/material/button";
import { RouterModule } from "@angular/router";
import { AppButton } from "./core/button/button";

enum appTheme {
  dark = "dark-mode",
  light = "light-mode",
}

@Component({
  imports: [RouterModule, AppButton],
  selector: "app-root",
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected title = "catalog";

  public theme = signal(appTheme.light);

  public themeButton = computed(() => {
    return {
      innerHtml: `Change to ${this.theme() === appTheme.light ? "dark" : "dark"} mode`,
      type: "filled" as MatButtonAppearance,
    };
  });

  public document = inject(DOCUMENT);
  public renderer = inject(Renderer2);

  constructor() {
    effect(() => {
      const classList = this.document.body.classList;
      classList.remove(appTheme.light, appTheme.dark);
      classList.add(this.theme());
      this.renderer.setAttribute(
        this.document.body,
        "class",
        classList.toString(),
      );
    });
  }

  public toggleTheme() {
    this.theme.set(
      this.theme() === appTheme.light ? appTheme.dark : appTheme.light,
    );
  }
}
