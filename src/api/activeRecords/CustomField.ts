export interface EntityCustomField {
    field_id: number;
    field_code?: string;
    values: CustomFieldValue[];
}

export enum CustomFieldType {
    TEXT = 'text',
    NUMERIC = 'numeric',
    CHECKBOX = 'checkbox',
    SELECT = 'select',
    MULTISELECT = 'multiselect',
    DATE = 'date',
    URL = 'url',
    TEXTAREA = 'textarea',
    RADIO_BUTTON = 'radiobutton',
    STREET_ADDRESS = 'streetaddress',
    SMART_ADDRESS = 'smart_address',
    LEGAL_ENTITY = 'legal_entity',
    BIRTHDAY = 'birthday',
    DATETIME = 'date_time',
    PRICE = 'price',
    CATEGORY = 'category',
    ITEMS = 'items',
    MULTITEXT = 'multitext',
    TRACKING_DATA = 'tracking_data',
    LINKED_ENTITY = 'linked_entity',
    CHAINED_LIST = 'chained_list',
    MONETARY = 'monetary',
    FILE = 'file',
    PAYER = 'payer',
    SUPPLIER = 'supplier'
}

export type CustomFieldValue = CustomFieldTextValue |
    CustomFieldNumericValue |
    CustomFieldDateTimeValue |
    CustomFieldSelectValue |
    CustomFieldSmartAddressValue |
    CustomFieldMultitextValue |
    CustomFieldLegalEntityValue |
    CustomFieldLegalItemsValue |
    CustomFieldLinkedEntityValue |
    CustomFieldChainedListEntityValue
;

export interface CustomFieldGenericValue<V> {
    value: V;
}

export type CustomFieldTextValue = CustomFieldGenericValue<string>;
export type CustomFieldNumericValue = CustomFieldGenericValue<number>;
export type CustomFieldDateTimeValue = CustomFieldGenericValue<number | string>;
export type CustomFieldSelectValue = CustomFieldTextValue & CustomFieldEnumValue<number, string>;
export type CustomFieldSmartAddressValue = CustomFieldTextValue & CustomFieldSmartAddressEnumValues;

export type CustomFieldMultitextValue = CustomFieldTextValue &
    CustomFieldEnumValue<number, CustomFieldPhoneEnumCode | CustomFieldEmailEnumCode>;

export type CustomFieldLegalEntityValue = CustomFieldGenericValue<CustomFieldLegalEntityValueData>;
export type CustomFieldLegalItemsValue = CustomFieldGenericValue<CustomFieldLegalItemsValueData>;
export type CustomFieldLinkedEntityValue = CustomFieldGenericValue<CustomFieldLinkedEntityValueData>;
export interface CustomFieldChainedListEntityValue {
    catalog_id?: number;
    catalog_element_id?: number;
}

export interface CustomFieldLinkedEntityValueData {
    name?: string;
    entity_id?: number;
    entity_type?: 'catalog_elements' | 'contacts' | 'companies';
    catalog_id?: number | null;
}

export interface CustomFieldLegalItemsValueData {
    sku?: string;
    description?: string;
    unit_price?: number;
    quantity?: number;
    unit_type?: string;
    discount?: {
        type?: 'percentage' | 'amount',
        value?: number;
        vat_rate_id?: 0 | 1 | 2 | 4 | 5;
        external_uid?: string;
    };
}

export interface CustomFieldLegalEntityValueData {
    name?: string;
    entity_type?: number;
    address?: string;
    real_address?: string;
    bank_account_number?: string;
    director?: string;
    vat_id?: string;
    tax_registration_reason_code?: string;
    kpp?: string;
    bank_code?: string;
    unp?: string;
    bin?: string;
    egrpou?: string;
    mfo?: string;
    oked?: string;
    external_uid?: string;
}

export enum CustomFieldPhoneEnumCode {
    WORK = 'WORK',
    WORKDD = 'WORKDD',
    MOB = 'MOB',
    FAX = 'FAX',
    HOME = 'HOME',
    OTHER = 'OTHER'
}

export enum CustomFieldEmailEnumCode {
    WORK = 'WORK',
    PRIV = 'PRIV',
    OTHER = 'OTHER'
}

export type CustomFieldSmartAddressEnumValues =
    CustomFieldEnumValue<1, 'address_line_1'> |
    CustomFieldEnumValue<2, 'address_line_2'> |
    CustomFieldEnumValue<3, 'city'> |
    CustomFieldEnumValue<4, 'state'> |
    CustomFieldEnumValue<5, 'zip'> |
    CustomFieldEnumValue<6, 'country'>;

export interface CustomFieldEnumValue<I, C> {
    enum_id?: I;
    enum_code?: C;
}