import { Component, Input, SimpleChange, SimpleChanges } from '@angular/core';
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

  ngOnChanges(changes: SimpleChanges){
    if(changes['milestone']){
      const milestone: Milestone = changes['milestone'].currentValue;
      this.galleryItems = [];
      if(milestone && milestone.albumId){
        this.getMistoneDetail(milestone._id);
      }else{
        this.album = undefined;
      }
    }
  }

  ngOnInit(){
    
  }

  getMistoneDetail(id: string){
    this.subscription.add(
      this.milestoneService.getDetail(id).subscribe(res=>{
        const metaData: Milestone = res.metaData;
        if(metaData.albumId){
          const album: Album = metaData.albumId as Album;
          this.album = album;
          this.initImages(album.media)
        }
      })
    )
  }

  private initImages(medias: Array<Media>) {
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
    }
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}
