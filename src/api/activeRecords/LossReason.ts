export interface IEmbeddedLossReason {
    id?: number;
    name?: string;
}

export interface IHasEmbeddedLossReasons {
    loss_reasons?: IEmbeddedLossReason[];
}