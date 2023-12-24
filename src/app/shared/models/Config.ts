import { FacebookUser } from "./Facebook";
import { Success } from "./Response";

export interface Config{
    facebookUser: FacebookUser
}
export interface ConfigResponse extends Success{
    metaData: Config
}