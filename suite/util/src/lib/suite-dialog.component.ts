import { Directive, ElementRef, inject, Renderer2 } from '@angular/core';

@Directive()
export abstract class SuiteDialog {
  private elm = inject(ElementRef);
  private renderer = inject(Renderer2);

  constructor() {
    this.renderer.setAttribute(
      this.elm.nativeElement,
      'class',
      'fixed z-50 left-0 top-0 right-0 bottom-0 px-[20vw] py[10vh] bg-indigo-600 bg-opacity-100',
    );
  }
}
