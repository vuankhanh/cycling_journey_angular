import { Component, Input, SimpleChange } from '@angular/core';
import { Milestone } from '../../models/Milestones';
import { GalleryItem } from '@daelmaak/ngx-gallery';
import { Album, Media } from '../../models/Album';
import { SetBaseUrlPipe } from '../../pipes/set-base-url.pipe';
import { Subscription } from 'rxjs';
import { MilestoneService } from '../../services/api/backend/milestone.service';

@Component({
  selector: 'app-custom-info-window',
  templateUrl: './custom-info-window.component.html',
  styleUrls: ['./custom-info-window.component.scss']
})
export class CustomInfoWindowComponent {
  @Input() milestone?: Milestone = undefined;
  album?: Album = undefined;
  galleryItems: GalleryItem[] = [];

  subscription: Subscription = new Subscription();
  constructor(
    private milestoneService: MilestoneService,
    private setBaseUrlPipe: SetBaseUrlPipe,
  ){

  }

  ngOnChanges(changes: SimpleChange){
    console.log(this.milestone);
    
    if(this.milestone && this.milestone?.albumId){
      console.log('run this...');
      this.getMistoneDetail(this.milestone._id);
    }else{
      this.album = undefined;
      this.galleryItems = [];
    }
  }

  ngOnInit(){
    
  }

  getMistoneDetail(mediaId: string){
    this.subscription.add(
      this.milestoneService.getDetail(mediaId).subscribe(res=>{
        console.log(res);
        
        const metaData: Milestone = res.metaData;
        console.log(metaData);
        if(metaData.albumId){
          const album: Album = metaData.albumId as Album;
          this.album = album;
          this.initImages(album.media)
        }
      })
    )
  }

  private initImages(medias: Array<Media>) {
    console.log(medias);

    for (let [index, media] of medias.entries()) {
      const src = this.setBaseUrlPipe.transform(media.url);
      const thumbSrc = this.setBaseUrlPipe.transform(media.thumbnailUrl);
      const galleryItem: GalleryItem = {
        src,
        thumbSrc,
        alt: media.caption,
        description: media.description,
        video: media.type === 'video' ? true : false
      }
      this.galleryItems.push(galleryItem);
      console.log(this.galleryItems);
      
    }
  }

  ngOnDestroy(){
    console.log();
    
    this.subscription.unsubscribe()
  }
}
