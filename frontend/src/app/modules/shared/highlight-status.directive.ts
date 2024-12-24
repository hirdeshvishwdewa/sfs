import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[highlightStatus]'
})
export class HighlightStatusDirective {

  @Input('highlightStatus') status = "";
  
  constructor(private eleRef: ElementRef) { }

  ngAfterViewInit() {
    this.changeColor();
  }

  changeColor() {
    switch(this.status) {
      case 'running':
        this.eleRef.nativeElement.style.background = "var(--running)";
      break;
      case 'stopped' :
        this.eleRef.nativeElement.style.background = "var(--stopped)";
      break;
      case 'maintenance':
        this.eleRef.nativeElement.style.background = "var(--maintenance)";
        this.eleRef.nativeElement.style.color = "black";
      break;
    }
  }
}
