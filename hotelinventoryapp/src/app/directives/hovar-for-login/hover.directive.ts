import { Directive, ElementRef, HostListener, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[hinvHover]'
})
export class HoverDirective implements OnInit {
  //if set the color here,then it is fixed.
  // if u change color in html file,it will not work.
  // it take it what u give as input.but if not set the color,
  // you can set in html file as deafult

  @Input() hinvHover: string = '';
  constructor(private element: ElementRef, private renderer: Renderer2) {
    console.log(element.nativeElement);
  }
  ngOnInit(): void {
    //this.element.nativeElement.style.backgroundColor=this.color;
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      this.hinvHover
    )
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'yellow'
    )
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'backgroundColor',
      'white'
    )
  }

}
