import { Success } from "./Response";

export type Token = AccessToken & RefreshToken

export interface AccessToken{
    accessToken: string
}

export interface RefreshToken{
    refreshToken: string
}

export interface TokenResponse extends Success{
    metaData: Token
}

export interface RefreshTokenResponse extends Success{
    metaData: AccessToken
}