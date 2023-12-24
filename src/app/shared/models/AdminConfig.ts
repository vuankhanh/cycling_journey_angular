import { Success } from "./Response";

export interface Config{
    serverTime: number
}
export interface AdminConfigResponse extends Success{
    metaData: Config
}