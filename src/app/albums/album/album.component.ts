import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UploadComponent } from 'src/app/shared/components/upload/upload.component';
import { Album } from 'src/app/shared/models/Album';
import { AlbumService } from 'src/app/shared/services/api/backend/album.service';

@Component({
  selector: 'app-album',
  templateUrl: './album.component.html',
  styleUrls: ['./album.component.scss']
})
export class AlbumComponent {
  albums: Array<Album> = [];
  private subscription: Subscription = new Subscription();
  constructor(
    private albumService: AlbumService,
    private dialog: MatDialog
  ){

  }
  
  ngOnInit(){
    this.getAll();
  }

  private getAll(){
    this.subscription.add(
      this.albumService.getAll().subscribe(res=>{
        const metaData: Array<Album> = res.metaData.data;
        this.albums = metaData;
        console.log(`albums: `);
        console.log(this.albums);
      })
    )
  }

  openUploadDialog(){
    const dialogRef = this.dialog.open(UploadComponent);

    this.subscription.add(
      dialogRef.afterClosed().subscribe(result => {
        if(result){
          const newAlbum: Album = result;
          this.albums.push(newAlbum);
        }
      })
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
