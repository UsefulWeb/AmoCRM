import {JSONObject} from "../../types";

export interface IEmbeddedCatalogElement {
    id: number;
    metadata: object;
    quantity: number;
    catalog_id: number;
    price_id: number;
}

export interface IHasEmbeddedCatalogElements {
    catalog_elements?: IEmbeddedCatalogElement[];
}