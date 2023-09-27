import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-new-milestones',
  templateUrl: './new-milestones.component.html',
  styleUrls: ['./new-milestones.component.scss'],
  standalone: true,
  imports: [MatDialogModule, MatButtonModule]
})
export class NewMilestonesComponent {

}
