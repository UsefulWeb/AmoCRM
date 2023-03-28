import {IEmbeddedEntity} from "../../interfaces/api";

export interface IEmbeddedSource extends IEmbeddedEntity{
    external_id?: number;
    type?: string;
}

export interface IHasEmbeddedSource {
    source?: IEmbeddedSource;
}