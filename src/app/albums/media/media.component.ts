import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Album, Media } from 'src/app/shared/models/Album';
import { AlbumService, DetailParams } from 'src/app/shared/services/api/backend/album.service';
import { Subscription, map, switchMap } from 'rxjs';
import { GalleryItem } from '@daelmaak/ngx-gallery';
import { SetBaseUrlPipe } from 'src/app/shared/pipes/set-base-url.pipe';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss']
})
export class MediaComponent {
  albumDetail!: Album;
  galleryItems: GalleryItem[] = []

  private subscription: Subscription = new Subscription();
  constructor(
    private activetedRoute: ActivatedRoute,
    private albumService: AlbumService,
    private setBaseUrlPipe: SetBaseUrlPipe
  ) {

  }

  ngOnInit() {
    let albumDetail$ = this.activetedRoute.params.pipe(
      map(params => {
        const detailParams: DetailParams = {route: params['media-route'] as string};
        return detailParams
      }),
      switchMap(detailParams => this.albumService.getDetail(detailParams))
    );

    this.subscription.add(
      albumDetail$.subscribe(res => {
        console.log(res);

        const metaData: Album = res.metaData;
        this.albumDetail = metaData;
        console.log(this.albumDetail);

        this.initImages(this.albumDetail.media)
        console.log(this.albumDetail);

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
      this.galleryItems.push(galleryItem)
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
