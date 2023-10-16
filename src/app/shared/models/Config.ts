import { Success } from "./Response";

export interface Config{
    serverTime: number
}
export interface ConfigResponse extends Success{
    metaData: Config
}