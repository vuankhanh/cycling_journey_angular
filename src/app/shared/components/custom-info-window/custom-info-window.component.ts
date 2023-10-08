import { Component, Input } from '@angular/core';
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
  @Input() galleryItems: GalleryItem[] = [];

  subscription: Subscription = new Subscription();
  constructor(
    private milestoneService: MilestoneService,
    private setBaseUrlPipe: SetBaseUrlPipe,
  ){

  }



  ngOnInit(){
    if(this.milestone && this.milestone._id){
      this.getMistoneDetail(this.milestone._id);
    }
  }

  getMistoneDetail(mediaId: string){
    this.subscription.add(
      this.milestoneService.getDetail(mediaId).subscribe(res=>{
        console.log(res);
        
        const metaData: Milestone = res.metaData;
        console.log(metaData);
        
        const album: Album = metaData.albumId as Album;
        this.initImages(album.media)
        console.log(metaData);
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
    this.subscription.unsubscribe()
  }
}
