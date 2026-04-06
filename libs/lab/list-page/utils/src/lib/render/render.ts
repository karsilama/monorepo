import {
  Directive,
  effect,
  inject,
  input,
  reflectComponentType,
  Type,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[labRender]',
  standalone: true,
})
export class Render {
  component = input<Type<unknown>>();
  context = input<Record<string, unknown>>({});

  private viewContainer = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      const componentType = this.component();
      const context = this.context();

      this.viewContainer.clear();
      if (!componentType) return;

      const componentRef = this.viewContainer.createComponent(componentType);

      const mirror = reflectComponentType(componentType);
      const allowedInputs = new Set(
        mirror?.inputs.map((i) => i.propName) ?? [],
      );

      for (const [key, value] of Object.entries(context)) {
        if (allowedInputs.has(key)) {
          componentRef.setInput(key, value);
        }
      }
    });
  }
}
