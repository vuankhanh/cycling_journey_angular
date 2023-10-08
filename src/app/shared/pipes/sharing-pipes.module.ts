import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatFileSizePipe } from './format-file-size.pipe';
import { SetBaseUrlPipe } from './set-base-url.pipe';

@NgModule({
  declarations: [
    FormatFileSizePipe,
    SetBaseUrlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatFileSizePipe,
    SetBaseUrlPipe
  ]
})
export class SharingPipesModule { }
