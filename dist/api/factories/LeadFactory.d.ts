import ResourceFactory from "../ResourceFactory";
import Lead from "../activeRecords/Lead";
import ResourcePagination from "../ResourcePagination";
export interface LeadsGetCriteria {
    with?: string;
    page?: number;
    limit?: number;
    query?: string | number;
    filter?: string;
    order?: string;
}
export interface LeadsGetByIdCriteria {
    with?: string;
}
export default class LeadFactory extends ResourceFactory {
    protected readonly entityClass: typeof Lead;
    get(criteria?: LeadsGetCriteria): Promise<ResourcePagination<import("../ResourceEntity").default>>;
    getById(id: number, criteria?: LeadsGetByIdCriteria): Promise<void>;
}
