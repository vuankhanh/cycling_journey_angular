import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatFileSizePipe } from './format-file-size.pipe';
import { SetBaseUrlPipe } from './set-base-url.pipe';
import { SafeMessagePipe } from './safe-message.pipe';

@NgModule({
  declarations: [
    FormatFileSizePipe,
    SetBaseUrlPipe,
    SafeMessagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormatFileSizePipe,
    SetBaseUrlPipe,
    SafeMessagePipe
  ]
})
export class SharingPipesModule { }
