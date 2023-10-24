import { Album } from "./Album"
import { Success } from "./Response"
export interface Milestone{
    _id: string,
    numericalOrder: number,
    name: string,
    address: string,
    dateTime: Date,
    coordinates: google.maps.LatLng | google.maps.LatLngLiteral,
    albumId: string | Album,
    createdAt: Date,
    updatedAt: Date
}

export interface MilestonesResponse extends Success{
    metaData: Array<Milestone>
}

export interface MilestonesDetailResponse extends Success{
    metaData: Milestone
}