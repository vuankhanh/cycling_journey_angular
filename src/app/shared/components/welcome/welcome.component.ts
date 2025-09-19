import { Component, Inject, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-welcome',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.scss'
})
export class WelcomeComponent implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer?: ElementRef<HTMLVideoElement>;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { mediaType: 'image' | 'video', mediaUrl: string }) {}

  ngAfterViewInit() {
    if (this.data.mediaType === 'video' && this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;

      // Tự động phát khi mở dialog
      setTimeout(() => {
        video.play().catch((err) => {
          console.error('Error playing video:', err);
        });
      }, 150);

      // Replay khi kết thúc
      video.addEventListener('ended', () => {
        video.currentTime = 0;
        video.play().catch((err) => {
          console.error('Error replaying video:', err);
        });
      });
    }
  }
}
