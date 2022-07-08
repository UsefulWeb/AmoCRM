import { IResourceEntity } from "../../../interfaces/api";
import { TEntityConstructor } from "../../../types";
import { applyMixins } from "../../../util";
import { canUpdate } from "../../factories/mixins/canUpdate";
import { canCreate } from "./canCreate";

export function canSave<T extends IResourceEntity>(Base: TEntityConstructor<T>): TEntityConstructor<T> {
    class CanSave {

    }
}