import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { GoogleService } from 'src/app/shared/services/api/backend/google.service';

@Component({
  selector: 'app-nuclear-suitcase',
  templateUrl: './nuclear-suitcase.component.html',
  styleUrls: ['./nuclear-suitcase.component.scss'],
})
export class NuclearSuitcaseComponent {
  private subscription: Subscription = new Subscription();
  constructor(
    private googleService: GoogleService,
    private toastrService: ToastrService
  ){

  }
  update(){
    this.subscription.add(
      this.googleService.updateDirection().subscribe(res=>{
        this.toastrService.success('Coordinate of milestones have been updated', 'sussess');
      })
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
