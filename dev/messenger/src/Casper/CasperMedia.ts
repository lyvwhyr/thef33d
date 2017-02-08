export interface ICasperMedia {
    title: string;
    smlImage: string;
    medImageUrl?: string;
    lrgImageUrl?: string;
    resourceID: string;
    canStream: boolean;
    link: string;
    playCount: number;
}

export class CasperMedia {
    readonly title: string;
    readonly smlImage: string;
    readonly medImageUrl?: string;
    readonly lrgImageUrl?: string;
    readonly resourceID: string;
    readonly canStream: boolean;
    readonly link: string;
    readonly playCount: number;

    constructor(obj: ICasperMedia) {
        this.title = obj.title;
        this.smlImage = obj.smlImage;
        this.medImageUrl = obj.medImageUrl;
        this.lrgImageUrl = obj.lrgImageUrl;
        this.resourceID = obj.resourceID;
        this.canStream = obj.canStream;
        this.link = obj.link;
        this.playCount = obj.playCount;
    }
};
