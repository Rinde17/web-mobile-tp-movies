import { Directive, Input, ElementRef, HostListener } from '@angular/core';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'img[appImgFallback]',
})
export class ImgFallbackDirective {
  @Input() appImgFallback: string | undefined;

  constructor(private _elementRef: ElementRef) {}

  @HostListener('error')
  loadFallbackImgOnError() {
    const element: HTMLImageElement = <HTMLImageElement>(
      this._elementRef.nativeElement
    );
    element.src = this.appImgFallback || 'assets/no_image_available.jpg';
  }
}
