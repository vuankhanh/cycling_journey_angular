import { AfterViewInit, Component } from '@angular/core';
import { SlidesComponent } from './shared/components/slides/slides.component';
import { MatDialog } from '@angular/material/dialog';
import { WelcomeComponent } from './shared/components/welcome/welcome.component';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(
    private readonly matDialog: MatDialog
  ) { }

  ngAfterViewInit() {
    this.openWelcome();
  }

  private openWelcome() {
    const data = {
      mediaType:  'video',
      mediaUrl: environment.backendStatic+ '/welcome/kinh-te-tri-thuc-ltd.mp4'
    }

    this.matDialog.open(WelcomeComponent, {
      data: data,
      panelClass: 'welcome-dialog',
    })
  }
}
