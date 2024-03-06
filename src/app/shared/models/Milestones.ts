import { Album } from "./Album"
import { Pagination } from "./Pagination"
import { Success } from "./Response"
export interface Milestone {
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

export interface MilestonesResponse extends Success {
  metaData: {
    data: Array<Milestone>,
    paging: Pagination
  }
}

export interface MilestonesDetailResponse extends Success {
  metaData: Milestone
}