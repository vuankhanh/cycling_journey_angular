import { Component } from '@angular/core';
import { AlbumService } from '../../services/api/backend/album.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { Album } from '../../models/Album';
import { MaterialModule } from '../../modules/material';
import { FormControl, Validators } from '@angular/forms';
import { SharingPipesModule } from '../../pipes/sharing-pipes.module';



@Component({
  selector: 'app-album-selection-dialog-box',
  templateUrl: './album-selection-dialog-box.component.html',
  styleUrls: ['./album-selection-dialog-box.component.scss'],
  standalone: true,
  imports: [
    SharingPipesModule,
    MaterialModule
  ]
})
export class AlbumSelectionDialogBoxComponent {
  albums: Array<Album> = [];
  albumIsSelectedControl: FormControl = new FormControl(null, Validators.required);
  subscription: Subscription = new Subscription();
  constructor(
    private albumService: AlbumService,
    public dialogRef: MatDialogRef<AlbumSelectionDialogBoxComponent>,
  ){
    
  }
  ngOnInit(){
    this.getAll();
  }

  private getAll(){
    this.subscription.add(
      this.albumService.getAllData().subscribe(data=>{
        this.albums = data;
      })
    )
  }

  selectionAlbum(album: Album){
    this.albumIsSelectedControl.setValue(album);
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
