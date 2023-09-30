import { Success } from "./Response"
export interface Milestones{
    _id: string,
    numericalOrder: number,
    name: string,
    address: string,
    coordinates: google.maps.LatLng | google.maps.LatLngLiteral,
    createdAt: Date,
    updatedAt: Date
}

export interface MilestonesResponse extends Success{
    metaData: Array<Milestones>
}