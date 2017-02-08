import * as firebase from 'firebase';

export enum TRMessageType  {
    URL,
    IMAGE,
    VIDEO,
    YOUTUBE,
    INSTAGRAM,
    TWITTER,
    GIF,
    EMBEDED
}

export interface TRMessage  {
    content: string;
    urls: string;
    type: TRMessageType;
    userId: string;
    creationTime: Date;
}


export function sendMessage(message: TRMessage) {

}
