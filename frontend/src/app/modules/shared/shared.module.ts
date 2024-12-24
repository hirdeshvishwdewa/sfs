import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightStatusDirective } from './highlight-status.directive';

@NgModule({
  declarations: [
    HighlightStatusDirective
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HighlightStatusDirective
  ]
})
export class SharedModule { }
