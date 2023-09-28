import { Coordinates } from "./GoogleMap";

export interface Milestones{
    _id: string,
    numericalOrder: number,
    name: string,
    address: string,
    coordinates: Coordinates
}