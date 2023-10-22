import { Component, ElementRef, Input, QueryList, SimpleChange, SimpleChanges, ViewChild, ViewChildren } from '@angular/core';
import { Milestone } from '../../models/Milestones';
import { GalleryComponent, GalleryItem, GalleryItemEvent } from '@daelmaak/ngx-gallery';
import { Album, Media } from '../../models/Album';
import { SetBaseUrlPipe } from '../../pipes/set-base-url.pipe';
import { Subscription } from 'rxjs';
import { MilestoneService } from '../../services/api/backend/milestone.service';
import { MatDialog } from '@angular/material/dialog';
import { SlidesComponent } from '../slides/slides.component';

@Component({
  selector: 'app-custom-info-window',
  templateUrl: './custom-info-window.component.html',
  styleUrls: ['./custom-info-window.component.scss']
})
export class CustomInfoWindowComponent {
  @Input() milestone?: Milestone = undefined;
  @Input() galleryConfig: GalleryComponent = new GalleryComponent();
  @ViewChild(GalleryComponent, { read: ElementRef }) galleryComponent!: ElementRef;
  album?: Album = undefined;
  galleryItems: GalleryItem[] = [];

  subscription: Subscription = new Subscription();
  constructor(
    private matDialog: MatDialog,
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

    setTimeout(() => {
      const childNodes: NodeList = this.galleryComponent.nativeElement.querySelectorAll('video');
      childNodes.forEach(e=>{
        const video: HTMLVideoElement = e as HTMLVideoElement;
        video.style.pointerEvents = 'none';
      })
    }, 150);
  }

  selection(event: GalleryItemEvent){
    const data = {
      metaData: this.galleryItems,
      selection: event.index
    }
    
    const dialog = this.matDialog.open(SlidesComponent, {
      id: '',
      data: data,
      minWidth: '100%',
      minHeight: '100%',
      maxWidth: '100%',
      maxHeight: '100%',
    })
    this.subscription.add(
      dialog.afterOpened().subscribe(_=>history.pushState(null, ''))
    )
  }

  ngOnDestroy(){
    this.subscription.unsubscribe()
  }
}