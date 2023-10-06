import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
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
    private albumService: AlbumService
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

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
