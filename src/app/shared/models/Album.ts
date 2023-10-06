import { Success } from "./Response"
import { Pagination } from "./Pagination"

export interface Album {
    _id: string,
    name: string,
    description: string,
    route: string,
    thumbnail: string,
    media: Array<Media>,
    mediaItems: number,
    createdAt: Date,
    updatedAt: Date
}

export interface Media {
    _id: string,
    url: string,
    thumbnailUrl: string,
    name: string,
    description: string,
    caption: string,
    alternateName: string,
    type: 'image' | 'video',
    created: Date,
    updated: Date,
}

export interface AlbumResponse extends Success{
    metaData: {
        data: Array<Album>,
        paging: Pagination
    }
}

export interface AlbumDetailRespone extends Success{
    metaData: Album
}