import { Coordinates } from "./GoogleMap";
import { Success } from "./Response";

export interface Polyline{
    _id: string,
    polylines: Array<Array<Coordinates>>,
    createdAt: Date,
    updatedAt: Date
}

export interface PolylineResponse extends Success{
    metaData: Polyline
}