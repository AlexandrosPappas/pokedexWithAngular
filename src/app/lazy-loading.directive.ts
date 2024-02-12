import { Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: '[appLazyLoading]',
})
export class LazyLoadingDirective {
  @HostBinding('attr.src') srcAttribute = null;
  //@Input() src: string;

  constructor(private el: ElementRef) {}
}
