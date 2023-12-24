export interface FacebookUser{
    name?: string;
    picture?: FacebookPicture;
    id?: string;
}

interface FacebookPicture{
    data: {
        width: number;
        height: number;
        is_silhouette: boolean;
        url: string;
    }
}