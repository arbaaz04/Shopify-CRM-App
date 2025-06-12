"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    frameworkVersion: function() {
        return frameworkVersion;
    },
    modelListIndex: function() {
        return modelListIndex;
    },
    modelsMap: function() {
        return modelsMap;
    }
});
/**
 * Internal variable to indicate the framework version this package is built with.
 * @internal
 */ const frameworkVersion = "^1.3.0";
/**
 * Internal variable to store model blobs with GraphQL typename as the key, and use them in the action code functions.
 * @internal
 */ const modelsMap = {
    "ShopifyCustomer": {
        "key": "DataModel-Shopify-Customer",
        "name": "shopifyCustomer",
        "apiIdentifier": "shopifyCustomer",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-Customer-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-Customer-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "MKUGfHmB6gsS",
                    "createdDate": "2025-04-09T15:50:12.065Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Customer-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Customer-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "wGeR60reD7BH",
                    "createdDate": "2025-04-09T15:50:12.065Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Customer-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Customer-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "6u8Qoul1_PU3",
                    "createdDate": "2025-04-09T15:50:12.065Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-__gadget_graphql_customer_statistics": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Customer-__gadget_graphql_customer_statistics",
                "name": "Statistics",
                "apiIdentifier": "statistics",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "1185ZAej6gxd",
                    "createdDate": "2025-04-09T15:50:12.078Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-__gadget_graphql_locale": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Customer-__gadget_graphql_locale",
                "name": "Locale",
                "apiIdentifier": "locale",
                "configuration": {
                    "type": "StringConfig",
                    "key": "0mIsePOMPgbp",
                    "createdDate": "2025-04-09T15:50:12.078Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-accepts_marketing": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Customer-accepts_marketing",
                "name": "Accepts Marketing",
                "apiIdentifier": "acceptsMarketing",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "FrWQ-RqXwTcZ",
                    "createdDate": "2025-04-09T15:50:12.066Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-accepts_marketing_updated_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Customer-accepts_marketing_updated_at",
                "name": "Accepts Marketing Updated At",
                "apiIdentifier": "acceptsMarketingUpdatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "jKeZ0gN3OGoz",
                    "createdDate": "2025-04-09T15:50:12.070Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-created_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Customer-created_at",
                "name": "Shopify Created At",
                "apiIdentifier": "shopifyCreatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "a2Qfb1BVRKpD",
                    "createdDate": "2025-04-09T15:50:12.066Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-currency": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Customer-currency",
                "name": "Currency",
                "apiIdentifier": "currency",
                "configuration": {
                    "type": "StringConfig",
                    "key": "mpo4fXAmlXZE",
                    "createdDate": "2025-04-09T15:50:12.071Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-email": {
                "fieldType": "Email",
                "key": "ModelField-DataModel-Shopify-Customer-email",
                "name": "Email",
                "apiIdentifier": "email",
                "configuration": {
                    "type": "EmailConfig",
                    "key": "NuCF-_uSvosy",
                    "createdDate": "2025-04-09T15:50:12.071Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-email_marketing_consent": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Customer-email_marketing_consent",
                "name": "Email Marketing Consent",
                "apiIdentifier": "emailMarketingConsent",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "uwe5mkZRCwkO",
                    "createdDate": "2025-04-09T15:50:12.077Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-first_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Customer-first_name",
                "name": "First Name",
                "apiIdentifier": "firstName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "aEeqAkRcXFrU",
                    "createdDate": "2025-04-09T15:50:12.071Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-last_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Customer-last_name",
                "name": "Last Name",
                "apiIdentifier": "lastName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "rvkSPwJrgLUw",
                    "createdDate": "2025-04-09T15:50:12.071Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-marketing_opt_in_level": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Customer-marketing_opt_in_level",
                "name": "Marketing Opt In Level",
                "apiIdentifier": "marketingOptInLevel",
                "configuration": {
                    "type": "StringConfig",
                    "key": "onFkmT42g1JD",
                    "createdDate": "2025-04-09T15:50:12.072Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-multipass_identifier": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Customer-multipass_identifier",
                "name": "Multipass Identifier",
                "apiIdentifier": "multipassIdentifier",
                "configuration": {
                    "type": "StringConfig",
                    "key": "HKPfSjTNgiZr",
                    "createdDate": "2025-04-09T15:50:12.072Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-note": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Customer-note",
                "name": "Note",
                "apiIdentifier": "note",
                "configuration": {
                    "type": "StringConfig",
                    "key": "rFZDbkFxtmj7",
                    "createdDate": "2025-04-09T15:50:12.073Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-orders": {
                "fieldType": "HasMany",
                "key": "ModelField-DataModel-Shopify-Customer-orders",
                "name": "Orders",
                "apiIdentifier": "orders",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "eo59cVt-geT_",
                    "createdDate": "2025-04-09T15:50:12.073Z",
                    "relatedModelKey": "DataModel-Shopify-Order",
                    "inverseFieldKey": "ModelField-Shopify-Order-Customer",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-phone": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Customer-phone",
                "name": "Phone",
                "apiIdentifier": "phone",
                "configuration": {
                    "type": "StringConfig",
                    "key": "FgWMczP7cU1V",
                    "createdDate": "2025-04-09T15:50:12.073Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-sms_marketing_consent": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Customer-sms_marketing_consent",
                "name": "SMS Marketing Consent",
                "apiIdentifier": "smsMarketingConsent",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "7BdluGRMa9lS",
                    "createdDate": "2025-04-09T15:50:12.077Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-state": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Customer-state",
                "name": "Shopify State",
                "apiIdentifier": "shopifyState",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "g11wq3yR-Mht",
                    "createdDate": "2025-04-09T15:50:12.077Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "SEPkYOfH9Xsm",
                            "createdDate": 1744213812077,
                            "name": "DISABLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MayNc8Qzziav",
                            "createdDate": 1744213812077,
                            "name": "INVITED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eDVA9-X-9gdI",
                            "createdDate": 1744213812077,
                            "name": "ENABLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kt9ZbBQVzsd0",
                            "createdDate": 1744213812077,
                            "name": "DECLINED",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-tags": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Customer-tags",
                "name": "Tags",
                "apiIdentifier": "tags",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "OvYZ1NkWNyag",
                    "createdDate": "2025-04-09T15:50:12.074Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-tax_exempt": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Customer-tax_exempt",
                "name": "Tax Exempt",
                "apiIdentifier": "taxExempt",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "279Rw9V5uUJC",
                    "createdDate": "2025-04-09T15:50:12.074Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-tax_exemptions-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Customer-tax_exemptions-Enum",
                "name": "Tax Exemptions",
                "apiIdentifier": "taxExemptions",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "twZKk4BXQn9y",
                    "createdDate": "2025-04-09T15:50:12.074Z",
                    "allowMultiple": true,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "8CUksYzhxt-P",
                            "createdDate": 1744213812074,
                            "name": "CA_BC_COMMERCIAL_FISHERY_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RZHVi3Uaeghr",
                            "createdDate": 1744213812074,
                            "name": "CA_BC_CONTRACTOR_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nc-DF7nf9lpg",
                            "createdDate": 1744213812074,
                            "name": "CA_BC_PRODUCTION_AND_MACHINERY_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IW48PFs_O_aM",
                            "createdDate": 1744213812074,
                            "name": "CA_BC_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9sDFh2Iyks4n",
                            "createdDate": 1744213812074,
                            "name": "CA_BC_SUB_CONTRACTOR_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Kyu2IhApYuAP",
                            "createdDate": 1744213812074,
                            "name": "CA_DIPLOMAT_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xhILbnLxz41r",
                            "createdDate": 1744213812074,
                            "name": "CA_MB_COMMERCIAL_FISHERY_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FiDNiykXp9j9",
                            "createdDate": 1744213812074,
                            "name": "CA_MB_FARMER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9HxCxRQ1e0NR",
                            "createdDate": 1744213812074,
                            "name": "CA_MB_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QL4IrJwVCmhj",
                            "createdDate": 1744213812074,
                            "name": "CA_NS_COMMERCIAL_FISHERY_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zjmIg2YJMleB",
                            "createdDate": 1744213812074,
                            "name": "CA_NS_FARMER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XgXSjvhP7HTO",
                            "createdDate": 1744213812074,
                            "name": "CA_ON_PURCHASE_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qiRClylwPdX4",
                            "createdDate": 1744213812074,
                            "name": "CA_PE_COMMERCIAL_FISHERY_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WtENoycitRrO",
                            "createdDate": 1744213812074,
                            "name": "CA_SK_COMMERCIAL_FISHERY_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DscmoaoFPrTY",
                            "createdDate": 1744213812074,
                            "name": "CA_SK_CONTRACTOR_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5w-aQGf_LAsX",
                            "createdDate": 1744213812075,
                            "name": "CA_SK_FARMER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "e_SlGky0GyPO",
                            "createdDate": 1744213812075,
                            "name": "CA_SK_PRODUCTION_AND_MACHINERY_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NFQjXFxkFLSr",
                            "createdDate": 1744213812075,
                            "name": "CA_SK_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "H52Rz7Y8BZ5V",
                            "createdDate": 1744213812075,
                            "name": "CA_SK_SUB_CONTRACTOR_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7lyIHPZcsTmx",
                            "createdDate": 1744213812075,
                            "name": "CA_STATUS_CARD_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YovNQKQ_4BLK",
                            "createdDate": 1744213812075,
                            "name": "EU_REVERSE_CHARGE_EXEMPTION_RULE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fGAtDtVfnnmy",
                            "createdDate": 1744213812075,
                            "name": "US_AK_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zbovelfs305e",
                            "createdDate": 1744213812075,
                            "name": "US_AL_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jcxZ2WhFJsAy",
                            "createdDate": 1744213812075,
                            "name": "US_AR_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "X5D0Ura7-pHj",
                            "createdDate": 1744213812075,
                            "name": "US_AZ_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DqJmFVhwreR2",
                            "createdDate": 1744213812075,
                            "name": "US_CA_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LQoXrqy22DW3",
                            "createdDate": 1744213812075,
                            "name": "US_CO_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MFb8LbO4RRA8",
                            "createdDate": 1744213812075,
                            "name": "US_CT_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fYQUuLy0Hlo7",
                            "createdDate": 1744213812075,
                            "name": "US_DC_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Qp30PUotlnQ_",
                            "createdDate": 1744213812075,
                            "name": "US_DE_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1zpdwvTmS1tt",
                            "createdDate": 1744213812075,
                            "name": "US_FL_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BlS9KHL_adxZ",
                            "createdDate": 1744213812075,
                            "name": "US_GA_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vmCPAz4Ct570",
                            "createdDate": 1744213812075,
                            "name": "US_HI_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ro-sBPqN_npI",
                            "createdDate": 1744213812075,
                            "name": "US_IA_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9EXK36Inp8dI",
                            "createdDate": 1744213812075,
                            "name": "US_ID_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WTQIAHMiKzxe",
                            "createdDate": 1744213812075,
                            "name": "US_IL_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bxzcKh2oY7cT",
                            "createdDate": 1744213812075,
                            "name": "US_IN_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "JyTLoLWF-tYm",
                            "createdDate": 1744213812075,
                            "name": "US_KS_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VBfFTmUcAbEz",
                            "createdDate": 1744213812075,
                            "name": "US_KY_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nQdc4fRG9Hxm",
                            "createdDate": 1744213812075,
                            "name": "US_LA_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bIVOfvu_vtwn",
                            "createdDate": 1744213812075,
                            "name": "US_MA_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "J3Uz1TmQavPy",
                            "createdDate": 1744213812075,
                            "name": "US_MD_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7qcQ_bkgdOAj",
                            "createdDate": 1744213812075,
                            "name": "US_ME_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fBF9nNbGEwR-",
                            "createdDate": 1744213812075,
                            "name": "US_MI_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Tnr-RYHgngLL",
                            "createdDate": 1744213812075,
                            "name": "US_MN_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "glGwVy6iIqLB",
                            "createdDate": 1744213812076,
                            "name": "US_MO_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "m6GMLY9goouO",
                            "createdDate": 1744213812076,
                            "name": "US_MS_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YFVRX5lmKRZ1",
                            "createdDate": 1744213812076,
                            "name": "US_MT_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ed6RWR6_AC8U",
                            "createdDate": 1744213812076,
                            "name": "US_NC_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RmULKyzzb5Cq",
                            "createdDate": 1744213812076,
                            "name": "US_ND_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SiHpk48Ldmbl",
                            "createdDate": 1744213812076,
                            "name": "US_NE_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0v7D0-89jYO0",
                            "createdDate": 1744213812076,
                            "name": "US_NH_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vTF_BpCsCV6T",
                            "createdDate": 1744213812076,
                            "name": "US_NJ_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IcZbjQkOFxJ5",
                            "createdDate": 1744213812076,
                            "name": "US_NM_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CkXyfwCOta5B",
                            "createdDate": 1744213812076,
                            "name": "US_NV_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GAiTIF6dLtzS",
                            "createdDate": 1744213812076,
                            "name": "US_NY_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ph9F351oXxit",
                            "createdDate": 1744213812076,
                            "name": "US_OH_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wI4Pttg6baDT",
                            "createdDate": 1744213812076,
                            "name": "US_OK_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "j0NSZSixpwpe",
                            "createdDate": 1744213812076,
                            "name": "US_OR_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Y5gnb21A1efO",
                            "createdDate": 1744213812076,
                            "name": "US_PA_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "L58CNES6WBTb",
                            "createdDate": 1744213812076,
                            "name": "US_RI_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "49nHbXLrBZOt",
                            "createdDate": 1744213812076,
                            "name": "US_SC_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VBPWwHS8c4gs",
                            "createdDate": 1744213812076,
                            "name": "US_SD_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "S6H2ayhwwnIM",
                            "createdDate": 1744213812076,
                            "name": "US_TN_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "88bGR5UqSICB",
                            "createdDate": 1744213812076,
                            "name": "US_TX_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "v_eqLkOdtA8f",
                            "createdDate": 1744213812076,
                            "name": "US_UT_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BrC2y3bYewbN",
                            "createdDate": 1744213812076,
                            "name": "US_VA_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tZ8tB5JjA6zz",
                            "createdDate": 1744213812076,
                            "name": "US_VT_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wLuq4uNIHrXG",
                            "createdDate": 1744213812076,
                            "name": "US_WA_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "u9mAcYbPDkXB",
                            "createdDate": 1744213812076,
                            "name": "US_WI_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bzYXEMJ1wj7X",
                            "createdDate": 1744213812076,
                            "name": "US_WV_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-ExH85yWNppT",
                            "createdDate": 1744213812076,
                            "name": "US_WY_RESELLER_EXEMPTION",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-updated_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Customer-updated_at",
                "name": "Shopify Updated At",
                "apiIdentifier": "shopifyUpdatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "IIAWP1JCdxir",
                    "createdDate": "2025-04-09T15:50:12.066Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Customer-verified_email": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Customer-verified_email",
                "name": "Verified Email",
                "apiIdentifier": "verifiedEmail",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "J1AdC30x2Qnk",
                    "createdDate": "2025-04-09T15:50:12.077Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Customer-Order": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Customer-Order",
                "name": "Last Order",
                "apiIdentifier": "lastOrder",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "dP_d0vR1bqCs",
                    "createdDate": "2025-05-22T07:52:16.372Z",
                    "relatedModelKey": "DataModel-Shopify-Order",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Customer-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Customer-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "B3JYacJMVYVf",
                    "createdDate": "2025-05-22T07:52:16.377Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyCustomer",
        "stateChart": {
            "type": "StateChart",
            "key": "lLlfzCAIrRC5",
            "createdDate": 1744213812057,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Customer-Start",
                    "createdDate": 1744213812058,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Customer-Created",
                    "createdDate": 1744213812058,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Customer-Deleted",
                    "createdDate": 1744213812059,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Customer-Start"
        }
    },
    "ShopifyGdprRequest": {
        "key": "DataModel-Shopify-GdprRequest",
        "name": "shopifyGdprRequest",
        "apiIdentifier": "shopifyGdprRequest",
        "namespace": [],
        "fields": {
            "DataModel-Shopify-GdprRequest-system-id": {
                "fieldType": "ID",
                "key": "DataModel-Shopify-GdprRequest-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "EIMU4aNSQHtQ",
                    "createdDate": "2025-04-09T15:50:12.783Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-GdprRequest-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-GdprRequest-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "PRhx8iPFSlvU",
                    "createdDate": "2025-04-09T15:50:12.783Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-GdprRequest-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-GdprRequest-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "bHAbAfIEpOda",
                    "createdDate": "2025-04-09T15:50:12.783Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-GdprRequest-Payload": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-GdprRequest-Payload",
                "name": "Payload",
                "apiIdentifier": "payload",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "cEVFlSzaDmIc",
                    "createdDate": "2025-04-09T15:50:12.785Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-GdprRequest-Topic": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-GdprRequest-Topic",
                "name": "Topic",
                "apiIdentifier": "topic",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "CWuAUXKE23zG",
                    "createdDate": "2025-04-09T15:50:12.784Z",
                    "allowMultiple": false,
                    "allowOther": false,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "mKjrC4eYkrdQ",
                            "createdDate": 1744213812784,
                            "name": "customers/data_request",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uFqSs_W_xpHZ",
                            "createdDate": 1744213812784,
                            "name": "customers/redact",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0dNDCEWsox8j",
                            "createdDate": 1744213812784,
                            "name": "shop/redact",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-GdprRequest-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-GdprRequest-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "DmvhSWah5vUs",
                    "createdDate": "2025-04-09T15:50:12.784Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyGdprRequest",
        "stateChart": {
            "type": "StateChart",
            "key": "QMQUTQjrw1dO",
            "createdDate": 1744213812776,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-GdprRequest-Start",
                    "createdDate": 1744213812777,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-GdprRequest-Created",
                    "createdDate": 1744213812777,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-GdprRequest-Deleted",
                    "createdDate": 1744213812777,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-GdprRequest-Start"
        }
    },
    "ShopifyOrder": {
        "key": "DataModel-Shopify-Order",
        "name": "shopifyOrder",
        "apiIdentifier": "shopifyOrder",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-Order-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-Order-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "3VWVsXNK0wuE",
                    "createdDate": "2025-04-09T15:50:12.438Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Order-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Order-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "-qYPvgJW3AKJ",
                    "createdDate": "2025-04-09T15:50:12.439Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Order-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Order-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "iNNMg_6_Fp5K",
                    "createdDate": "2025-04-09T15:50:12.439Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-__gadget_graphql_additional_fees": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-__gadget_graphql_additional_fees",
                "name": "Additional Fees",
                "apiIdentifier": "additionalFees",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "pJm7zkbsG4k-",
                    "createdDate": "2025-04-09T15:50:12.474Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-__gadget_graphql_order_cancellation": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-__gadget_graphql_order_cancellation",
                "name": "Cancellation",
                "apiIdentifier": "cancellation",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "8qnpibQt6ETd",
                    "createdDate": "2025-04-09T15:50:12.475Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-billing_address": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-billing_address",
                "name": "Billing Address",
                "apiIdentifier": "billingAddress",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "fJFLg7Ezxev9",
                    "createdDate": "2025-04-09T15:50:12.439Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-browser_ip": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-browser_ip",
                "name": "Browser IP",
                "apiIdentifier": "browserIp",
                "configuration": {
                    "type": "StringConfig",
                    "key": "pIHuLhB07dgA",
                    "createdDate": "2025-04-09T15:50:12.440Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-buyer_accepts_marketing": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-buyer_accepts_marketing",
                "name": "Buyer Accepts Marketing",
                "apiIdentifier": "buyerAcceptsMarketing",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "crv6jW9xU3Xg",
                    "createdDate": "2025-04-09T15:50:12.440Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-cancel_reason-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-cancel_reason-Enum",
                "name": "Cancel Reason",
                "apiIdentifier": "cancelReason",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "l6be-aQ85ZZR",
                    "createdDate": "2025-04-09T15:50:12.441Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "s-pDdjW5ZRVJ",
                            "createdDate": 1744213812441,
                            "name": "CUSTOMER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bOscFsEbFCFM",
                            "createdDate": 1744213812441,
                            "name": "DECLINED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9lXavWYfZvPs",
                            "createdDate": 1744213812441,
                            "name": "FRAUD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BvvnkflzG6IJ",
                            "createdDate": 1744213812441,
                            "name": "INVENTORY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4tdSj7qxfuCY",
                            "createdDate": 1744213812441,
                            "name": "OTHER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GRqPTMhkcIdX",
                            "createdDate": 1744213812441,
                            "name": "STAFF",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-cancelled_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Order-cancelled_at",
                "name": "Cancelled At",
                "apiIdentifier": "cancelledAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "uVki0x_h3xv1",
                    "createdDate": "2025-04-09T15:50:12.441Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-cart_token": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-cart_token",
                "name": "Cart Token",
                "apiIdentifier": "cartToken",
                "configuration": {
                    "type": "StringConfig",
                    "key": "1q1Z9qM7HVZ3",
                    "createdDate": "2025-04-09T15:50:12.441Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-checkout_token": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-checkout_token",
                "name": "Checkout Token",
                "apiIdentifier": "checkoutToken",
                "configuration": {
                    "type": "StringConfig",
                    "key": "XbK3dCW91zUz",
                    "createdDate": "2025-04-09T15:50:12.441Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-client_details": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-client_details",
                "name": "Client Details",
                "apiIdentifier": "clientDetails",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "DaHkv6KU05hc",
                    "createdDate": "2025-04-09T15:50:12.442Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-closed_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Order-closed_at",
                "name": "Closed At",
                "apiIdentifier": "closedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "fnHz-VyyupuK",
                    "createdDate": "2025-04-09T15:50:12.442Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-currency-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-currency-Enum",
                "name": "Currency",
                "apiIdentifier": "currency",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "NTTWbZAJfs5X",
                    "createdDate": "2025-04-09T15:50:12.442Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "BsqOjz-E4Ym_",
                            "createdDate": 1744213812442,
                            "name": "AED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Om3YkshvlEhO",
                            "createdDate": 1744213812442,
                            "name": "AFN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3LoxcSP3OQyH",
                            "createdDate": 1744213812442,
                            "name": "ALL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Y1XpEthc1vGA",
                            "createdDate": 1744213812442,
                            "name": "AMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SXnx20KhFRZX",
                            "createdDate": 1744213812442,
                            "name": "ANG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "67TyUDFp8-WB",
                            "createdDate": 1744213812442,
                            "name": "AOA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6DO2yZPNw64F",
                            "createdDate": 1744213812442,
                            "name": "ARS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "q4nVME1fco8x",
                            "createdDate": 1744213812443,
                            "name": "AUD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8My3vJmMOxTD",
                            "createdDate": 1744213812443,
                            "name": "AWG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "msTTmHL2yW1J",
                            "createdDate": 1744213812443,
                            "name": "AZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dsQnuc0H-pBS",
                            "createdDate": 1744213812443,
                            "name": "BAM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ohOi-DMPwd5A",
                            "createdDate": 1744213812443,
                            "name": "BBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vagZHI2sbJlb",
                            "createdDate": 1744213812443,
                            "name": "BDT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1YwNFiqVOPJM",
                            "createdDate": 1744213812443,
                            "name": "BGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rdifrStKzuCX",
                            "createdDate": 1744213812443,
                            "name": "BHD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pRXoRK26pk1y",
                            "createdDate": 1744213812443,
                            "name": "BIF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xZqRavqx42hO",
                            "createdDate": 1744213812443,
                            "name": "BMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ri7hq9rPglqC",
                            "createdDate": 1744213812443,
                            "name": "BND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "v2Gs3Spgohs3",
                            "createdDate": 1744213812443,
                            "name": "BOB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IfkqqzLDLf2p",
                            "createdDate": 1744213812443,
                            "name": "BRL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RmFKFy_y_GZI",
                            "createdDate": 1744213812443,
                            "name": "BSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IzgB-cXGRIS2",
                            "createdDate": 1744213812443,
                            "name": "BTN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pGzSfgGN9nqa",
                            "createdDate": 1744213812443,
                            "name": "BWP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ypLqyd7HbRxN",
                            "createdDate": 1744213812443,
                            "name": "BYN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sX3HajXxF6gQ",
                            "createdDate": 1744213812443,
                            "name": "BYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_WbTv_3od73A",
                            "createdDate": 1744213812443,
                            "name": "BZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sXjaMf9ZMLhg",
                            "createdDate": 1744213812443,
                            "name": "CAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5fKMMc4Rml4k",
                            "createdDate": 1744213812443,
                            "name": "CDF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Sed9gbvN4why",
                            "createdDate": 1744213812443,
                            "name": "CHF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FUUm2Wz4QI0s",
                            "createdDate": 1744213812443,
                            "name": "CLP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xnuIkX6L5REF",
                            "createdDate": 1744213812443,
                            "name": "CNY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KK3KeidAJhIY",
                            "createdDate": 1744213812443,
                            "name": "COP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LJ8SpTIFxG2a",
                            "createdDate": 1744213812443,
                            "name": "CRC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sUjjnIpH_-hK",
                            "createdDate": 1744213812443,
                            "name": "CVE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "x7qk92pd6HfA",
                            "createdDate": 1744213812443,
                            "name": "CZK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ydZrNJT275lh",
                            "createdDate": 1744213812443,
                            "name": "DJF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AEEVLpLfFeHP",
                            "createdDate": 1744213812444,
                            "name": "DKK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8X_JjtoMprbY",
                            "createdDate": 1744213812444,
                            "name": "DOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zxRS1Tx89LlW",
                            "createdDate": 1744213812444,
                            "name": "DZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "feR0UIlD7m5J",
                            "createdDate": 1744213812444,
                            "name": "EGP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-zQ2cTBHK6Op",
                            "createdDate": 1744213812444,
                            "name": "ERN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AL7Ro0OkCogf",
                            "createdDate": 1744213812444,
                            "name": "ETB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PX92C9dOJByY",
                            "createdDate": 1744213812444,
                            "name": "EUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9LAXkKnQdXq2",
                            "createdDate": 1744213812444,
                            "name": "FJD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "iKiFiD7QK6oN",
                            "createdDate": 1744213812444,
                            "name": "FKP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KCZ1bI9SmWR9",
                            "createdDate": 1744213812444,
                            "name": "GBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aLPKlg3QNwUF",
                            "createdDate": 1744213812444,
                            "name": "GEL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UH3OsdP7yV60",
                            "createdDate": 1744213812444,
                            "name": "GHS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "whOlG6-mteMo",
                            "createdDate": 1744213812444,
                            "name": "GIP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jD27-5GFQxbv",
                            "createdDate": 1744213812444,
                            "name": "GMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1LX0y-O7T3U8",
                            "createdDate": 1744213812444,
                            "name": "GNF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CPzbagGGQvh4",
                            "createdDate": 1744213812444,
                            "name": "GTQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PvEyk7p58lHE",
                            "createdDate": 1744213812444,
                            "name": "GYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PZnPrZ4TadQU",
                            "createdDate": 1744213812444,
                            "name": "HKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XL09najwrkw8",
                            "createdDate": 1744213812444,
                            "name": "HNL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zmz-nPTG8kbf",
                            "createdDate": 1744213812444,
                            "name": "HRK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "B82auMIheUr1",
                            "createdDate": 1744213812444,
                            "name": "HTG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5IS0gn9HRTB3",
                            "createdDate": 1744213812444,
                            "name": "HUF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NFRm4nkB3VtL",
                            "createdDate": 1744213812444,
                            "name": "IDR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "B9CAKGzolJZ0",
                            "createdDate": 1744213812444,
                            "name": "ILS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mcrdj6iLb5-H",
                            "createdDate": 1744213812444,
                            "name": "INR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eqlhJCW_kk7o",
                            "createdDate": 1744213812444,
                            "name": "IQD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aXx4pce34tLS",
                            "createdDate": 1744213812444,
                            "name": "IRR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8E9xr3zVrZk0",
                            "createdDate": 1744213812444,
                            "name": "ISK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YNxeSea_NZH-",
                            "createdDate": 1744213812444,
                            "name": "JEP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-7ny2aMcaUGU",
                            "createdDate": 1744213812445,
                            "name": "JMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qCUoyWtFxWFV",
                            "createdDate": 1744213812445,
                            "name": "JOD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DMekswoP3dwL",
                            "createdDate": 1744213812445,
                            "name": "JPY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "teaEGU0PS_3-",
                            "createdDate": 1744213812445,
                            "name": "KES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PTF8tRj9XcA5",
                            "createdDate": 1744213812445,
                            "name": "KGS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "r17zD0RdLa2_",
                            "createdDate": 1744213812445,
                            "name": "KHR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QwmFJ5yj9Is5",
                            "createdDate": 1744213812445,
                            "name": "KID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_8lW7dXqNmHw",
                            "createdDate": 1744213812445,
                            "name": "KMF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "X_WuHfkYwwxb",
                            "createdDate": 1744213812445,
                            "name": "KRW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "d1-tIKsFYhIl",
                            "createdDate": 1744213812445,
                            "name": "KWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Dk9pOwkVLmFR",
                            "createdDate": 1744213812445,
                            "name": "KYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lOzldtobg5jt",
                            "createdDate": 1744213812445,
                            "name": "KZT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Tabfszh5ey3i",
                            "createdDate": 1744213812445,
                            "name": "LAK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XONdeRHZP3Ws",
                            "createdDate": 1744213812445,
                            "name": "LBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zPxrgUT72gnC",
                            "createdDate": 1744213812445,
                            "name": "LKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XkOsNiYPgRQI",
                            "createdDate": 1744213812445,
                            "name": "LRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1OM48YBzHzWm",
                            "createdDate": 1744213812445,
                            "name": "LSL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cAM1m-yiQuMf",
                            "createdDate": 1744213812445,
                            "name": "LTL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UyBbRe7H82YA",
                            "createdDate": 1744213812445,
                            "name": "LVL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "E9dq_oFxVJjD",
                            "createdDate": 1744213812445,
                            "name": "LYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FbYU1kCCCzfE",
                            "createdDate": 1744213812445,
                            "name": "MAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fOTnh8EUn3yn",
                            "createdDate": 1744213812445,
                            "name": "MDL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yAkohzgxZE1C",
                            "createdDate": 1744213812445,
                            "name": "MGA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1WriCWY_9_dy",
                            "createdDate": 1744213812445,
                            "name": "MKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eoR7Bgn7KBoR",
                            "createdDate": 1744213812445,
                            "name": "MMK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YB9dfjhyb1Uu",
                            "createdDate": 1744213812445,
                            "name": "MNT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WCEWZCgV2ZWj",
                            "createdDate": 1744213812445,
                            "name": "MOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xz43Sfy0_oh_",
                            "createdDate": 1744213812445,
                            "name": "MRU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ugPWF9AwfJaF",
                            "createdDate": 1744213812445,
                            "name": "MUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_7uwg2k3ISFE",
                            "createdDate": 1744213812445,
                            "name": "MVR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Mak6MUJ1kQAz",
                            "createdDate": 1744213812446,
                            "name": "MWK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zj6pJ-A4Xga3",
                            "createdDate": 1744213812446,
                            "name": "MXN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jJUNr_KCC-f4",
                            "createdDate": 1744213812446,
                            "name": "MYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RL80SRY84Uun",
                            "createdDate": 1744213812446,
                            "name": "MZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QdAbAJ96hVg8",
                            "createdDate": 1744213812446,
                            "name": "NAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WIPp_F2Rqvx-",
                            "createdDate": 1744213812446,
                            "name": "NGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GXte3V-pElgO",
                            "createdDate": 1744213812446,
                            "name": "NIO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qGVJKe5P6VgE",
                            "createdDate": 1744213812446,
                            "name": "NOK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OIsw3ZCoLTx2",
                            "createdDate": 1744213812446,
                            "name": "NPR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PAsgnuEx_mgy",
                            "createdDate": 1744213812446,
                            "name": "NZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zZP-ZLGvZKpm",
                            "createdDate": 1744213812446,
                            "name": "OMR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "oFmRMOxD7udi",
                            "createdDate": 1744213812446,
                            "name": "PAB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jii6cGv4rEoA",
                            "createdDate": 1744213812446,
                            "name": "PEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OTWlInTYz5i5",
                            "createdDate": 1744213812446,
                            "name": "PGK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pyT46p9_Mf0F",
                            "createdDate": 1744213812446,
                            "name": "PHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7cW8Gs3yyZ63",
                            "createdDate": 1744213812446,
                            "name": "PKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "K_WU0XyoBY0n",
                            "createdDate": 1744213812446,
                            "name": "PLN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1ZHPmJFuRBPO",
                            "createdDate": 1744213812446,
                            "name": "PYG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "g3x5TZgEzjce",
                            "createdDate": 1744213812446,
                            "name": "QAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OBln0DoChXQe",
                            "createdDate": 1744213812446,
                            "name": "RON",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LtJKwAMrF3ib",
                            "createdDate": 1744213812446,
                            "name": "RSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ocDGtgnLC4wx",
                            "createdDate": 1744213812446,
                            "name": "RUB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Z1dC7ck88UIW",
                            "createdDate": 1744213812446,
                            "name": "RWF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "be6FHYrWU1xE",
                            "createdDate": 1744213812446,
                            "name": "SAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fvrJXF4GiXM3",
                            "createdDate": 1744213812446,
                            "name": "SBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NxT-QkLOy1k3",
                            "createdDate": 1744213812446,
                            "name": "SCR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "JTvXJ5TuhMCq",
                            "createdDate": 1744213812446,
                            "name": "SDG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PoK0btiwhSZI",
                            "createdDate": 1744213812446,
                            "name": "SEK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Gf3XrbgglEB2",
                            "createdDate": 1744213812446,
                            "name": "SGD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IvpjBNa3YNti",
                            "createdDate": 1744213812446,
                            "name": "SHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qIMQKzEIf3Aa",
                            "createdDate": 1744213812446,
                            "name": "SLL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Qfj3r7lqbT21",
                            "createdDate": 1744213812446,
                            "name": "SOS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LSEfn2KqOwe_",
                            "createdDate": 1744213812447,
                            "name": "SRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SGhA_WvBA1WI",
                            "createdDate": 1744213812447,
                            "name": "SSP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_L31Nr8m_rRJ",
                            "createdDate": 1744213812447,
                            "name": "STD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qnKwuD3D6dwu",
                            "createdDate": 1744213812447,
                            "name": "SYP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "azo12ZGxeDXl",
                            "createdDate": 1744213812447,
                            "name": "SZL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bh2wpPmPDXHz",
                            "createdDate": 1744213812447,
                            "name": "THB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Il-Qaw1SmsSg",
                            "createdDate": 1744213812447,
                            "name": "TJS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mHJkWmtAYAXC",
                            "createdDate": 1744213812447,
                            "name": "TMT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LQBAawnf2Cz7",
                            "createdDate": 1744213812447,
                            "name": "TND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3vPEvIAnlHKD",
                            "createdDate": 1744213812447,
                            "name": "TOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AUhIrQV8Qvgo",
                            "createdDate": 1744213812447,
                            "name": "TRY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "m1nyKfRgyoe0",
                            "createdDate": 1744213812447,
                            "name": "TTD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ysOIEy5yICuQ",
                            "createdDate": 1744213812447,
                            "name": "TWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "E8tVfzHrNEO2",
                            "createdDate": 1744213812447,
                            "name": "TZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pmEOPTxVhedk",
                            "createdDate": 1744213812447,
                            "name": "UAH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xEXIRbE5OUSJ",
                            "createdDate": 1744213812447,
                            "name": "UGX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RZApRAsM79zx",
                            "createdDate": 1744213812447,
                            "name": "USD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "N1z5KVw5ZRM2",
                            "createdDate": 1744213812447,
                            "name": "UYU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1WFdrbzPyLBw",
                            "createdDate": 1744213812447,
                            "name": "UZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZFt18bLmqF52",
                            "createdDate": 1744213812447,
                            "name": "VEF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ltq6XyE7itsF",
                            "createdDate": 1744213812447,
                            "name": "VES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pu4wdnXWLf1l",
                            "createdDate": 1744213812447,
                            "name": "VND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WUCnQbdeRfgA",
                            "createdDate": 1744213812447,
                            "name": "VUV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ncWEt2d6iWjT",
                            "createdDate": 1744213812447,
                            "name": "WST",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tKGdTdRmDOwe",
                            "createdDate": 1744213812447,
                            "name": "XAF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YukHlzsbhdRS",
                            "createdDate": 1744213812447,
                            "name": "XCD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "USeWc5DCTmT4",
                            "createdDate": 1744213812447,
                            "name": "XOF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "c5h6GphUw-ks",
                            "createdDate": 1744213812447,
                            "name": "XPF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_MHGl4YuPfkg",
                            "createdDate": 1744213812447,
                            "name": "XXX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5g_rJPm4vDNY",
                            "createdDate": 1744213812447,
                            "name": "YER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "x8DBztjRfj-_",
                            "createdDate": 1744213812447,
                            "name": "ZAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "v9vR_pLsJJL_",
                            "createdDate": 1744213812448,
                            "name": "ZMW",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-customer_locale": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-customer_locale",
                "name": "Customer Locale",
                "apiIdentifier": "customerLocale",
                "configuration": {
                    "type": "StringConfig",
                    "key": "I_7ULAYeZxAE",
                    "createdDate": "2025-04-09T15:50:12.450Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-discount_applications": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-discount_applications",
                "name": "Discount Applications",
                "apiIdentifier": "discountApplications",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "fK9bl5Cg96VS",
                    "createdDate": "2025-04-09T15:50:12.451Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-discount_codes": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-discount_codes",
                "name": "Discount Codes",
                "apiIdentifier": "discountCodes",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "PV9d4hgse6SX",
                    "createdDate": "2025-04-09T15:50:12.451Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-email": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-email",
                "name": "Email",
                "apiIdentifier": "email",
                "configuration": {
                    "type": "StringConfig",
                    "key": "mO8P06zhzk4A",
                    "createdDate": "2025-04-09T15:50:12.451Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-estimated_taxes": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-estimated_taxes",
                "name": "Estimated Taxes",
                "apiIdentifier": "estimatedTaxes",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "ajsoIyNiQWd_",
                    "createdDate": "2025-04-09T15:50:12.451Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-financial_status-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-financial_status-Enum",
                "name": "Financial Status",
                "apiIdentifier": "financialStatus",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "6J1BtY_dU7zJ",
                    "createdDate": "2025-04-09T15:50:12.452Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "OK4jSAMZH8T2",
                            "createdDate": 1744213812452,
                            "name": "AUTHORIZED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "S9XFP1EQQ99-",
                            "createdDate": 1744213812452,
                            "name": "EXPIRED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Sl94A1cioSv5",
                            "createdDate": 1744213812452,
                            "name": "PAID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "iQG-Dsc4FUN9",
                            "createdDate": 1744213812452,
                            "name": "PARTIALLY_PAID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cJWR_aXqxp2x",
                            "createdDate": 1744213812452,
                            "name": "PARTIALLY_REFUNDED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "M4H5S4M6B75X",
                            "createdDate": 1744213812452,
                            "name": "PENDING",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AcReUX1ujUT9",
                            "createdDate": 1744213812452,
                            "name": "REFUNDED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2vuKpA7L_9nQ",
                            "createdDate": 1744213812452,
                            "name": "VOIDED",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-fulfillment_status-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-fulfillment_status-Enum",
                "name": "Fulfillment Status",
                "apiIdentifier": "fulfillmentStatus",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "7uFfLTUc1G-M",
                    "createdDate": "2025-04-09T15:50:12.452Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "RpVkSw7h_055",
                            "createdDate": 1744213812452,
                            "name": "FULFILLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vb6lQXGWvp_g",
                            "createdDate": 1744213812452,
                            "name": "IN_PROGRESS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uxOoEhSgPqbu",
                            "createdDate": 1744213812452,
                            "name": "ON_HOLD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4tTc938ovX4f",
                            "createdDate": 1744213812452,
                            "name": "OPEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "CCIE0RM7Sd3s",
                            "createdDate": 1744213812452,
                            "name": "PARTIALLY_FULFILLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Kq1tGxnWgWRZ",
                            "createdDate": 1744213812453,
                            "name": "PENDING_FULFILLMENT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "A5OEtNSeoU7_",
                            "createdDate": 1744213812453,
                            "name": "REQUEST_DECLINED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "EVuAiP9ly2Xs",
                            "createdDate": 1744213812453,
                            "name": "RESTOCKED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sM9AUAy7SvCA",
                            "createdDate": 1744213812453,
                            "name": "SCHEDULED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eF0rR6NvcWBh",
                            "createdDate": 1744213812453,
                            "name": "UNFULFILLED",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-landing_site": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Order-landing_site",
                "name": "Landing Site",
                "apiIdentifier": "landingSite",
                "configuration": {
                    "type": "URLConfig",
                    "key": "Oem4ZnnZrFNw",
                    "createdDate": "2025-04-09T15:50:12.453Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-name",
                "name": "Name",
                "apiIdentifier": "name",
                "configuration": {
                    "type": "StringConfig",
                    "key": "749gamRtETFQ",
                    "createdDate": "2025-04-09T15:50:12.453Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-note": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-note",
                "name": "Note",
                "apiIdentifier": "note",
                "configuration": {
                    "type": "StringConfig",
                    "key": "PbX5dA7-XTz8",
                    "createdDate": "2025-04-09T15:50:12.454Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-note_attributes": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-note_attributes",
                "name": "Note Attributes",
                "apiIdentifier": "noteAttributes",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "Ad-a2nF7jgm6",
                    "createdDate": "2025-04-09T15:50:12.454Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-order_status_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-Order-order_status_url",
                "name": "Order Status URL",
                "apiIdentifier": "orderStatusUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "W-R-A6nwPK4x",
                    "createdDate": "2025-04-09T15:50:12.454Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-payment_gateway_names": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-payment_gateway_names",
                "name": "Payment Gateway Names",
                "apiIdentifier": "paymentGatewayNames",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "8-wGy4TDOsCe",
                    "createdDate": "2025-04-09T15:50:12.461Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-presentment_currency-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Order-presentment_currency-Enum",
                "name": "Presentment Currency",
                "apiIdentifier": "presentmentCurrency",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "_UkCJfn3MWhQ",
                    "createdDate": "2025-04-09T15:50:12.461Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "sKpTUOvfDEvK",
                            "createdDate": 1744213812462,
                            "name": "AED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MkWDzEr0SBIc",
                            "createdDate": 1744213812462,
                            "name": "AFN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3bZCpXnLyOF5",
                            "createdDate": 1744213812462,
                            "name": "ALL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "p-Bz-AukrxS1",
                            "createdDate": 1744213812462,
                            "name": "AMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_GCM9pe6O_Kv",
                            "createdDate": 1744213812462,
                            "name": "ANG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "akmtPex564CJ",
                            "createdDate": 1744213812462,
                            "name": "AOA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "u318M3fdQC6R",
                            "createdDate": 1744213812462,
                            "name": "ARS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rq721KDnORmr",
                            "createdDate": 1744213812462,
                            "name": "AUD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qCxpKhRfn7L2",
                            "createdDate": 1744213812462,
                            "name": "AWG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "V6TS9IdwY3cN",
                            "createdDate": 1744213812462,
                            "name": "AZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_viDuvMqgHKN",
                            "createdDate": 1744213812462,
                            "name": "BAM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_pWcuoGtp0WK",
                            "createdDate": 1744213812462,
                            "name": "BBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xAf19bO9Sik1",
                            "createdDate": 1744213812462,
                            "name": "BDT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vA91mWDxcBVA",
                            "createdDate": 1744213812462,
                            "name": "BGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XccLLg3YYXAp",
                            "createdDate": 1744213812462,
                            "name": "BHD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MXChu-KXl1Ge",
                            "createdDate": 1744213812462,
                            "name": "BIF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8UAe_a_v5c7o",
                            "createdDate": 1744213812462,
                            "name": "BMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BgmlCtgCL6sC",
                            "createdDate": 1744213812462,
                            "name": "BND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7rDv0QoE6m4Z",
                            "createdDate": 1744213812462,
                            "name": "BOB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "g8IFwfM1rUJ7",
                            "createdDate": 1744213812462,
                            "name": "BRL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "U1fE31rCmK0I",
                            "createdDate": 1744213812462,
                            "name": "BSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "H1LPLGoOkOCW",
                            "createdDate": 1744213812462,
                            "name": "BTN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "EOBvrN_aV6AH",
                            "createdDate": 1744213812462,
                            "name": "BWP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "w_R6b9osD6ML",
                            "createdDate": 1744213812462,
                            "name": "BYN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4-VkzFdkYyJ8",
                            "createdDate": 1744213812462,
                            "name": "BYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nWmPwOOQ5L6q",
                            "createdDate": 1744213812462,
                            "name": "BZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "89Q0cYNWfrER",
                            "createdDate": 1744213812462,
                            "name": "CAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "izHCD3ZTwJec",
                            "createdDate": 1744213812463,
                            "name": "CDF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "baadofvhKg9F",
                            "createdDate": 1744213812463,
                            "name": "CHF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dY9xyH03p-jI",
                            "createdDate": 1744213812463,
                            "name": "CLP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gGKX_L6jzYy6",
                            "createdDate": 1744213812463,
                            "name": "CNY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NfZEy3uETX1A",
                            "createdDate": 1744213812463,
                            "name": "COP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Af-dfbqhh3i_",
                            "createdDate": 1744213812463,
                            "name": "CRC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AH6D3nfrfbGF",
                            "createdDate": 1744213812463,
                            "name": "CVE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KSXA9yg5ZjjS",
                            "createdDate": 1744213812463,
                            "name": "CZK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2awpbSn2oU3o",
                            "createdDate": 1744213812463,
                            "name": "DJF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kqsbiFa93Wuu",
                            "createdDate": 1744213812463,
                            "name": "DKK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sd2oNg9iWcMm",
                            "createdDate": 1744213812463,
                            "name": "DOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "U9qW8dHny30R",
                            "createdDate": 1744213812463,
                            "name": "DZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6EoeVeHayQWq",
                            "createdDate": 1744213812463,
                            "name": "EGP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jSwh_w8pr3KZ",
                            "createdDate": 1744213812463,
                            "name": "ERN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rNJbzy3cfsl-",
                            "createdDate": 1744213812463,
                            "name": "ETB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nNZ8u8RGKGdO",
                            "createdDate": 1744213812463,
                            "name": "EUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "z18RHTrzodwH",
                            "createdDate": 1744213812463,
                            "name": "FJD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mGBBh7LLDAYi",
                            "createdDate": 1744213812463,
                            "name": "FKP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bVxKcF9b0zOG",
                            "createdDate": 1744213812463,
                            "name": "GBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PTdraLjATZzC",
                            "createdDate": 1744213812463,
                            "name": "GEL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "u46D4v6Z0uMp",
                            "createdDate": 1744213812463,
                            "name": "GHS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "F8iVmHe6nRho",
                            "createdDate": 1744213812463,
                            "name": "GIP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QpTNbkyGnU7r",
                            "createdDate": 1744213812463,
                            "name": "GMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pDU68zGJkJ8C",
                            "createdDate": 1744213812463,
                            "name": "GNF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YgFKo8tMJB2m",
                            "createdDate": 1744213812463,
                            "name": "GTQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gbIbHCxa_adp",
                            "createdDate": 1744213812463,
                            "name": "GYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YVbL5TvJwX_r",
                            "createdDate": 1744213812463,
                            "name": "HKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ex-bBpnNweib",
                            "createdDate": 1744213812463,
                            "name": "HNL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aZJTs5mbvBVu",
                            "createdDate": 1744213812463,
                            "name": "HRK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IxXp3hS61WsP",
                            "createdDate": 1744213812463,
                            "name": "HTG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "awMJy6ug0OwE",
                            "createdDate": 1744213812463,
                            "name": "HUF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dokme03yMyPs",
                            "createdDate": 1744213812464,
                            "name": "IDR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VR_a3PI_noEG",
                            "createdDate": 1744213812464,
                            "name": "ILS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sy9MV6ZrDsCm",
                            "createdDate": 1744213812464,
                            "name": "INR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "q27bsaetlpb2",
                            "createdDate": 1744213812464,
                            "name": "IQD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AIk5jQvj3nME",
                            "createdDate": 1744213812464,
                            "name": "IRR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "40d_MZfj0NMn",
                            "createdDate": 1744213812464,
                            "name": "ISK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xisDHfkVMXfU",
                            "createdDate": 1744213812464,
                            "name": "JEP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FuHe3wj-rMWc",
                            "createdDate": 1744213812464,
                            "name": "JMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "m5gReHYegwGg",
                            "createdDate": 1744213812464,
                            "name": "JOD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vRl_b7FE112B",
                            "createdDate": 1744213812464,
                            "name": "JPY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vgg8T9aS8gN8",
                            "createdDate": 1744213812464,
                            "name": "KES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9WfpYM1TV4sO",
                            "createdDate": 1744213812464,
                            "name": "KGS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "liEGmpETGlpj",
                            "createdDate": 1744213812464,
                            "name": "KHR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9otB6kI7k2DY",
                            "createdDate": 1744213812464,
                            "name": "KID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "S2UDEQvW7pOm",
                            "createdDate": 1744213812464,
                            "name": "KMF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NqHnHNXYdu1W",
                            "createdDate": 1744213812464,
                            "name": "KRW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "34k3DQU7sCtM",
                            "createdDate": 1744213812464,
                            "name": "KWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lbvuK3_3unzY",
                            "createdDate": 1744213812464,
                            "name": "KYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TIubwoPea4hG",
                            "createdDate": 1744213812464,
                            "name": "KZT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SdpKLkhdLCHY",
                            "createdDate": 1744213812464,
                            "name": "LAK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "00nmeyyD3PYA",
                            "createdDate": 1744213812464,
                            "name": "LBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nhbRERDZTXiy",
                            "createdDate": 1744213812464,
                            "name": "LKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HLsQlD56IgNZ",
                            "createdDate": 1744213812464,
                            "name": "LRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "A6ZMLfdH2Kyy",
                            "createdDate": 1744213812464,
                            "name": "LSL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FnT61P_Vs10z",
                            "createdDate": 1744213812464,
                            "name": "LTL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-AOtWoD_Bi_j",
                            "createdDate": 1744213812464,
                            "name": "LVL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "J4nsMKVXg_1E",
                            "createdDate": 1744213812464,
                            "name": "LYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Lwu8mXwnqUTa",
                            "createdDate": 1744213812464,
                            "name": "MAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nUguf5kelX1T",
                            "createdDate": 1744213812464,
                            "name": "MDL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UlIKsK9pd7lo",
                            "createdDate": 1744213812464,
                            "name": "MGA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eGS6iJoStPkp",
                            "createdDate": 1744213812464,
                            "name": "MKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7zYwlZE7h-vH",
                            "createdDate": 1744213812464,
                            "name": "MMK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0IlBkxHUvOTR",
                            "createdDate": 1744213812465,
                            "name": "MNT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "K4zKQ8_0_FgF",
                            "createdDate": 1744213812465,
                            "name": "MOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PoqPTt7PJBks",
                            "createdDate": 1744213812465,
                            "name": "MRU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Jqlbj17f5q-f",
                            "createdDate": 1744213812465,
                            "name": "MUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jlyTaeCWZotd",
                            "createdDate": 1744213812465,
                            "name": "MVR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MoTpEKzG_PgI",
                            "createdDate": 1744213812465,
                            "name": "MWK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YhjH38SrUR7x",
                            "createdDate": 1744213812465,
                            "name": "MXN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WNurIebJfR0q",
                            "createdDate": 1744213812465,
                            "name": "MYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1aoaq3UGtqgA",
                            "createdDate": 1744213812465,
                            "name": "MZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fLvP-cVVui6g",
                            "createdDate": 1744213812465,
                            "name": "NAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Hx8dCXdVk3h2",
                            "createdDate": 1744213812465,
                            "name": "NGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yPZ6oa-pDxOJ",
                            "createdDate": 1744213812465,
                            "name": "NIO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "js9L-TeihlKY",
                            "createdDate": 1744213812465,
                            "name": "NOK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ueZ83Ima6nxS",
                            "createdDate": 1744213812465,
                            "name": "NPR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PxJsXphkOA--",
                            "createdDate": 1744213812465,
                            "name": "NZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ah-QxAOZZv1J",
                            "createdDate": 1744213812465,
                            "name": "OMR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KSYBLpUcvB5Z",
                            "createdDate": 1744213812465,
                            "name": "PAB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rWl6cVxCQmoS",
                            "createdDate": 1744213812465,
                            "name": "PEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "emc7hGK9Bb6O",
                            "createdDate": 1744213812465,
                            "name": "PGK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IKXYyZLi4qbz",
                            "createdDate": 1744213812465,
                            "name": "PHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VGt3m8Fifo_e",
                            "createdDate": 1744213812465,
                            "name": "PKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zr7mnlBb8eos",
                            "createdDate": 1744213812465,
                            "name": "PLN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rAmUJ0nE_lYi",
                            "createdDate": 1744213812465,
                            "name": "PYG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Vak2ClQVBWep",
                            "createdDate": 1744213812465,
                            "name": "QAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mSV7XPL_3E5f",
                            "createdDate": 1744213812465,
                            "name": "RON",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_qyUTKMKFC2K",
                            "createdDate": 1744213812465,
                            "name": "RSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NLEWAXmobyQt",
                            "createdDate": 1744213812465,
                            "name": "RUB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gzowXy2mRPij",
                            "createdDate": 1744213812466,
                            "name": "RWF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xL3FPt1r1_Qc",
                            "createdDate": 1744213812466,
                            "name": "SAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1B6cGQqZGFKz",
                            "createdDate": 1744213812466,
                            "name": "SBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ggap5ypIjUgj",
                            "createdDate": 1744213812466,
                            "name": "SCR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Atrkkz_qDbuM",
                            "createdDate": 1744213812466,
                            "name": "SDG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4Usqv3CVC-FL",
                            "createdDate": 1744213812466,
                            "name": "SEK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "79x0TUNQsUto",
                            "createdDate": 1744213812466,
                            "name": "SGD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HV5f-th3NoX8",
                            "createdDate": 1744213812466,
                            "name": "SHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LFYQ7QU2Twu7",
                            "createdDate": 1744213812466,
                            "name": "SLL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8d6AIbWRxAdD",
                            "createdDate": 1744213812466,
                            "name": "SOS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HWbKcQpsieVY",
                            "createdDate": 1744213812466,
                            "name": "SRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dwVVAOaxPB3M",
                            "createdDate": 1744213812466,
                            "name": "SSP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3zJcrJopV155",
                            "createdDate": 1744213812466,
                            "name": "STD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OPkwWRYJL19S",
                            "createdDate": 1744213812466,
                            "name": "SYP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xFBB1r6ZIKCo",
                            "createdDate": 1744213812466,
                            "name": "SZL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6RF377Au1iAA",
                            "createdDate": 1744213812466,
                            "name": "THB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YXVgBIcdmBVM",
                            "createdDate": 1744213812466,
                            "name": "TJS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FDZ06ac5DUr2",
                            "createdDate": 1744213812466,
                            "name": "TMT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "C0-iW8-lVXPR",
                            "createdDate": 1744213812466,
                            "name": "TND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BjuzJR0C2sMz",
                            "createdDate": 1744213812466,
                            "name": "TOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WCEw2vyOVTnw",
                            "createdDate": 1744213812466,
                            "name": "TRY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LtIxY6S5TA6t",
                            "createdDate": 1744213812466,
                            "name": "TTD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AkZJ8rhRfO8o",
                            "createdDate": 1744213812466,
                            "name": "TWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ATac5sfyuYal",
                            "createdDate": 1744213812466,
                            "name": "TZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IRlFm9LMrYJE",
                            "createdDate": 1744213812466,
                            "name": "UAH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Gdx-47N3FxKr",
                            "createdDate": 1744213812466,
                            "name": "UGX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cnBp_rJwJ402",
                            "createdDate": 1744213812466,
                            "name": "USD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xABHSpyyGTxW",
                            "createdDate": 1744213812466,
                            "name": "UYU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ntnylPpGKW15",
                            "createdDate": 1744213812466,
                            "name": "UZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6S_Tg7WzHdA_",
                            "createdDate": 1744213812466,
                            "name": "VEF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "oLxqclNlx8m9",
                            "createdDate": 1744213812467,
                            "name": "VES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FfRomFDK0y9_",
                            "createdDate": 1744213812467,
                            "name": "VND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dFFwJdxoyM7-",
                            "createdDate": 1744213812467,
                            "name": "VUV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "u3KUj2xae6ze",
                            "createdDate": 1744213812467,
                            "name": "WST",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5FLfLIhIl9Av",
                            "createdDate": 1744213812467,
                            "name": "XAF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FM_UBUYw7bm3",
                            "createdDate": 1744213812467,
                            "name": "XCD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "e8Fa8QewGrel",
                            "createdDate": 1744213812467,
                            "name": "XOF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "H7Vx9ZRmwVON",
                            "createdDate": 1744213812467,
                            "name": "XPF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "36tj4K37jibR",
                            "createdDate": 1744213812467,
                            "name": "XXX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fQJ3r7f9rlFt",
                            "createdDate": 1744213812467,
                            "name": "YER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rlBY-XWNEZbz",
                            "createdDate": 1744213812467,
                            "name": "ZAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ORHDVkpobGbq",
                            "createdDate": 1744213812467,
                            "name": "ZMW",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-processed_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Order-processed_at",
                "name": "Processed At",
                "apiIdentifier": "processedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "nclRWzMrt94I",
                    "createdDate": "2025-04-09T15:50:12.467Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-processing_method": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-processing_method",
                "name": "Processing Method",
                "apiIdentifier": "processingMethod",
                "configuration": {
                    "type": "StringConfig",
                    "key": "D6MKfcxUZPFE",
                    "createdDate": "2025-04-09T15:50:12.467Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-shipping_address": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-shipping_address",
                "name": "Shipping Address",
                "apiIdentifier": "shippingAddress",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "Fm0fxcsh5k7P",
                    "createdDate": "2025-04-09T15:50:12.468Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-source_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-source_name",
                "name": "Source Name",
                "apiIdentifier": "sourceName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "jfViM1S901kC",
                    "createdDate": "2025-04-09T15:50:12.468Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-subtotal_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-subtotal_price",
                "name": "Subtotal Price",
                "apiIdentifier": "subtotalPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "AlZgPd4jir0V",
                    "createdDate": "2025-04-09T15:50:12.469Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-subtotal_price_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-subtotal_price_set",
                "name": "Subtotal Price Set",
                "apiIdentifier": "subtotalPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "rXMfYJHT8goX",
                    "createdDate": "2025-04-09T15:50:12.469Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-tags": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-tags",
                "name": "Tags",
                "apiIdentifier": "tags",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "Juy_pSfw9HLE",
                    "createdDate": "2025-04-09T15:50:12.469Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-tax_lines": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-tax_lines",
                "name": "Tax Lines",
                "apiIdentifier": "taxLines",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "k2WLkIyYoIWE",
                    "createdDate": "2025-04-09T15:50:12.469Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-taxes_included": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-taxes_included",
                "name": "Taxes Included",
                "apiIdentifier": "taxesIncluded",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "v6FYoBMYzPTC",
                    "createdDate": "2025-04-09T15:50:12.470Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-test": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Order-test",
                "name": "Test",
                "apiIdentifier": "test",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "f2MB9-pO6-A0",
                    "createdDate": "2025-04-09T15:50:12.470Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_discounts": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_discounts",
                "name": "Total Discounts",
                "apiIdentifier": "totalDiscounts",
                "configuration": {
                    "type": "StringConfig",
                    "key": "bviwWr4Xr2Gu",
                    "createdDate": "2025-04-09T15:50:12.470Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_discounts_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-total_discounts_set",
                "name": "Total Discounts Set",
                "apiIdentifier": "totalDiscountsSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "66ITXVVEXpMT",
                    "createdDate": "2025-04-09T15:50:12.470Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_line_items_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_line_items_price",
                "name": "Total Line Items Price",
                "apiIdentifier": "totalLineItemsPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "NuaFVVLzUmDf",
                    "createdDate": "2025-04-09T15:50:12.471Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_line_items_price_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-total_line_items_price_set",
                "name": "Total Line Items Price Set",
                "apiIdentifier": "totalLineItemsPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "JQlCXh1AIHb5",
                    "createdDate": "2025-04-09T15:50:12.471Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_outstanding": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_outstanding",
                "name": "Total Outstanding",
                "apiIdentifier": "totalOutstanding",
                "configuration": {
                    "type": "StringConfig",
                    "key": "LNlt6mnax477",
                    "createdDate": "2025-04-09T15:50:12.471Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_price",
                "name": "Total Price",
                "apiIdentifier": "totalPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "EgG4pcXUqVfR",
                    "createdDate": "2025-04-09T15:50:12.471Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_price_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-total_price_set",
                "name": "Total Price Set",
                "apiIdentifier": "totalPriceSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "_JTriWYPaJfg",
                    "createdDate": "2025-04-09T15:50:12.472Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_tax": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_tax",
                "name": "Total Tax",
                "apiIdentifier": "totalTax",
                "configuration": {
                    "type": "StringConfig",
                    "key": "p3LR3twzkaBT",
                    "createdDate": "2025-04-09T15:50:12.472Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_tax_set": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Order-total_tax_set",
                "name": "Total Tax Set",
                "apiIdentifier": "totalTaxSet",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "ZsPFztxkAWSp",
                    "createdDate": "2025-04-09T15:50:12.472Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_tip_received": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Order-total_tip_received",
                "name": "Total Tip Received",
                "apiIdentifier": "totalTipReceived",
                "configuration": {
                    "type": "StringConfig",
                    "key": "5W_yA5dtxuBL",
                    "createdDate": "2025-04-09T15:50:12.473Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-total_weight": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Order-total_weight",
                "name": "Total Weight",
                "apiIdentifier": "totalWeight",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "fqs2Fboc1ywu",
                    "createdDate": "2025-04-09T15:50:12.473Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Order-Customer": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Order-Customer",
                "name": "Customer",
                "apiIdentifier": "customer",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "2PU4DQ9KGDaa",
                    "createdDate": "2025-04-09T15:50:12.450Z",
                    "relatedModelKey": "DataModel-Shopify-Customer",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Order-fulfillments": {
                "fieldType": "HasMany",
                "key": "ModelField-DataModel-Shopify-Order-fulfillments",
                "name": "Fulfillments",
                "apiIdentifier": "fulfillments",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "MZMEYlUjhW9G",
                    "createdDate": "2025-04-10T07:48:29.249Z",
                    "relatedModelKey": "DataModel-Shopify-Fulfillment",
                    "inverseFieldKey": "ModelField-Shopify-Fulfillment-Order",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "jV9n9w9ddBkG": {
                "fieldType": "BelongsTo",
                "key": "jV9n9w9ddBkG",
                "name": "shopifyShop",
                "apiIdentifier": "shopifyShop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "jYkP3XUjvKx5",
                    "createdDate": "2025-04-12T07:36:51.074Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": "shopifyShop"
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Order-FulfillmentOrders": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Order-FulfillmentOrders",
                "name": "Fulfillment Orders",
                "apiIdentifier": "fulfillmentOrders",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "9EnGnzjcZYBK",
                    "createdDate": "2025-05-22T07:52:16.391Z",
                    "relatedModelKey": "DataModel-Shopify-FulfillmentOrder",
                    "inverseFieldKey": "ModelField-Shopify-FulfillmentOrder-Order",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Order-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Order-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "Vo_d3lCy0-54",
                    "createdDate": "2025-05-22T07:52:16.399Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            },
            "zmUxDbQrRPpm": {
                "fieldType": "Boolean",
                "key": "zmUxDbQrRPpm",
                "name": "writeToSheets",
                "apiIdentifier": "writeOrder",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "T0zpV-zPHMmp",
                    "createdDate": "2025-06-10T10:50:29.640Z",
                    "default": false
                },
                "internalWritable": true
            },
            "WF9jdF-lE09t": {
                "fieldType": "Boolean",
                "key": "WF9jdF-lE09t",
                "name": "sheetsSynced",
                "apiIdentifier": "autoWrite",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "iYOKUck-YGhQ",
                    "createdDate": "2025-06-10T10:54:07.678Z",
                    "default": false
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyOrder",
        "stateChart": {
            "type": "StateChart",
            "key": "JWyaa1mq2oO4",
            "createdDate": 1744213812432,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Order-Start",
                    "createdDate": 1744213812433,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Order-Created",
                    "createdDate": 1744213812433,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Order-Deleted",
                    "createdDate": 1744213812433,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Order-Start"
        }
    },
    "ShopifyShop": {
        "key": "DataModel-Shopify-Shop",
        "name": "shopifyShop",
        "apiIdentifier": "shopifyShop",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-Shop-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-Shop-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "jraFbH1C1JM3",
                    "createdDate": "2025-04-09T15:49:56.026Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Shop-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Shop-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "lFicGaSeVry_",
                    "createdDate": "2025-04-09T15:49:56.027Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Shop-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Shop-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "tFi7lS66k9Jp",
                    "createdDate": "2025-04-09T15:49:56.027Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Shop-system-state": {
                "fieldType": "RecordState",
                "key": "DataModel-Shopify-Shop-system-state",
                "name": "State",
                "apiIdentifier": "state",
                "configuration": {
                    "type": "RecordStateConfig",
                    "key": "v9vEcDF4UaIL",
                    "createdDate": "2025-04-09T15:49:56.028Z"
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-__gadget_graphql_shop_plan": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-__gadget_graphql_shop_plan",
                "name": "Plan",
                "apiIdentifier": "plan",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "XUlqEqUvTszV",
                    "createdDate": "2025-04-09T15:49:56.084Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-access_token": {
                "fieldType": "EncryptedString",
                "key": "ModelField-DataModel-Shopify-Shop-access_token",
                "name": "Access Token",
                "apiIdentifier": "accessToken",
                "configuration": {
                    "type": "EncryptedStringConfig",
                    "key": "38Vd2A3uip05",
                    "createdDate": "2025-04-09T15:49:56.086Z"
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-address1": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-address1",
                "name": "Address 1",
                "apiIdentifier": "address1",
                "configuration": {
                    "type": "StringConfig",
                    "key": "eI8siNxESlLJ",
                    "createdDate": "2025-04-09T15:49:56.028Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-address2": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-address2",
                "name": "Address 2",
                "apiIdentifier": "address2",
                "configuration": {
                    "type": "StringConfig",
                    "key": "xGGpr_i-oRXU",
                    "createdDate": "2025-04-09T15:49:56.029Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-city": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-city",
                "name": "City",
                "apiIdentifier": "city",
                "configuration": {
                    "type": "StringConfig",
                    "key": "alr9SU4qiEfq",
                    "createdDate": "2025-04-09T15:49:56.029Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-country": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-country",
                "name": "Country",
                "apiIdentifier": "country",
                "configuration": {
                    "type": "StringConfig",
                    "key": "QKd6hHLBbVBp",
                    "createdDate": "2025-04-09T15:49:56.030Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-country_code": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-country_code",
                "name": "Country Code",
                "apiIdentifier": "countryCode",
                "configuration": {
                    "type": "StringConfig",
                    "key": "xEhcVhyW7c5n",
                    "createdDate": "2025-04-09T15:49:56.030Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-country_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-country_name",
                "name": "Country Name",
                "apiIdentifier": "countryName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "SgtKfRMU3Xml",
                    "createdDate": "2025-04-09T15:49:56.031Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-county_taxes": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-county_taxes",
                "name": "County Taxes",
                "apiIdentifier": "countyTaxes",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "74jbmekwZ21Y",
                    "createdDate": "2025-04-09T15:49:56.031Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-created_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Shop-created_at",
                "name": "Shopify Created At",
                "apiIdentifier": "shopifyCreatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "V_sYdnf23PW9",
                    "createdDate": "2025-04-09T15:49:56.062Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-currency-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Shop-currency-Enum",
                "name": "Currency",
                "apiIdentifier": "currency",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "sr08KAKwR2qq",
                    "createdDate": "2025-04-09T15:49:56.031Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "HkRR1j6m4zem",
                            "createdDate": 1744213796032,
                            "name": "AED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6SRHYnIH3ouI",
                            "createdDate": 1744213796032,
                            "name": "AFN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_M9AaJXIOnOg",
                            "createdDate": 1744213796032,
                            "name": "ALL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DcenCbRktCsY",
                            "createdDate": 1744213796032,
                            "name": "AMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_dP6QOVeEN-B",
                            "createdDate": 1744213796032,
                            "name": "ANG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DbPakDfGlnNI",
                            "createdDate": 1744213796032,
                            "name": "AOA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0h3Fs9rol5EW",
                            "createdDate": 1744213796032,
                            "name": "ARS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VyFQEgDm39xu",
                            "createdDate": 1744213796032,
                            "name": "AUD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6K6hLj2927kw",
                            "createdDate": 1744213796032,
                            "name": "AWG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "u9nDNxHbLBSM",
                            "createdDate": 1744213796032,
                            "name": "AZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TTIyxG7cpWFx",
                            "createdDate": 1744213796032,
                            "name": "BAM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4va0Ro_IkiA2",
                            "createdDate": 1744213796032,
                            "name": "BBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bwXUH6J_KH9X",
                            "createdDate": 1744213796032,
                            "name": "BDT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YKDKTkutcFz5",
                            "createdDate": 1744213796032,
                            "name": "BGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dNi_A-fbow55",
                            "createdDate": 1744213796032,
                            "name": "BHD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fEbJBo3ecS5p",
                            "createdDate": 1744213796032,
                            "name": "BIF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZOj9cC9ubBfD",
                            "createdDate": 1744213796033,
                            "name": "BMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bbmzWcYKIyrn",
                            "createdDate": 1744213796033,
                            "name": "BND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "oJ_rzAqL-oAg",
                            "createdDate": 1744213796033,
                            "name": "BOB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xvE-Za9LeIKj",
                            "createdDate": 1744213796033,
                            "name": "BRL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gPLciS1mbG16",
                            "createdDate": 1744213796033,
                            "name": "BSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "W5hC2EYb9YGI",
                            "createdDate": 1744213796033,
                            "name": "BTN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZpwSUqjEeGlO",
                            "createdDate": 1744213796033,
                            "name": "BWP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HLDcyQyQ2VOD",
                            "createdDate": 1744213796033,
                            "name": "BYN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TsSn1ivdg-Mb",
                            "createdDate": 1744213796033,
                            "name": "BYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8E4qkhE9QNCW",
                            "createdDate": 1744213796033,
                            "name": "BZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sUQAilX6a1AQ",
                            "createdDate": 1744213796033,
                            "name": "CAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lK13MgNzb6J1",
                            "createdDate": 1744213796033,
                            "name": "CDF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "O9c6fuqC8xiD",
                            "createdDate": 1744213796033,
                            "name": "CHF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RxtV0iNldF8W",
                            "createdDate": 1744213796033,
                            "name": "CLP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gbD5pnTiIUGR",
                            "createdDate": 1744213796033,
                            "name": "CNY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hQ15bD4FfAwl",
                            "createdDate": 1744213796033,
                            "name": "COP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "--GskmyZ7gRp",
                            "createdDate": 1744213796033,
                            "name": "CRC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "V8KYQwhBZZrj",
                            "createdDate": 1744213796033,
                            "name": "CVE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PzauEugGz5NH",
                            "createdDate": 1744213796034,
                            "name": "CZK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8qFfHjukqhuV",
                            "createdDate": 1744213796034,
                            "name": "DJF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AlbcjX7b1MGQ",
                            "createdDate": 1744213796034,
                            "name": "DKK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jdrG8qL37XbJ",
                            "createdDate": 1744213796034,
                            "name": "DOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8zNd3_oVo3wc",
                            "createdDate": 1744213796034,
                            "name": "DZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bPV7GK6tkzmP",
                            "createdDate": 1744213796034,
                            "name": "EGP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9kCPJJFk9vh9",
                            "createdDate": 1744213796034,
                            "name": "ERN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RW8zYDiLe5hj",
                            "createdDate": 1744213796034,
                            "name": "ETB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PbARBN_3UW3Z",
                            "createdDate": 1744213796034,
                            "name": "EUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TqJA7i5EE79e",
                            "createdDate": 1744213796034,
                            "name": "FJD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Og80CSLwObGA",
                            "createdDate": 1744213796034,
                            "name": "FKP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6Si0Ty4WjwHD",
                            "createdDate": 1744213796034,
                            "name": "GBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ZzE5uqr5BQXc",
                            "createdDate": 1744213796034,
                            "name": "GEL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WvklT9z-y5Pq",
                            "createdDate": 1744213796034,
                            "name": "GHS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UY7-PRAoDNKO",
                            "createdDate": 1744213796034,
                            "name": "GIP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "td1A_tQoB-mD",
                            "createdDate": 1744213796034,
                            "name": "GMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "EGAPe9HOhWbh",
                            "createdDate": 1744213796034,
                            "name": "GNF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FwMq-FtmpDOJ",
                            "createdDate": 1744213796034,
                            "name": "GTQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FB73NrFoFJar",
                            "createdDate": 1744213796034,
                            "name": "GYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3yMvVGwCwI9h",
                            "createdDate": 1744213796035,
                            "name": "HKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "U2qsqTDk0Usu",
                            "createdDate": 1744213796035,
                            "name": "HNL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BnsZmUFTud7-",
                            "createdDate": 1744213796035,
                            "name": "HRK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BIvUCGM9ydzm",
                            "createdDate": 1744213796035,
                            "name": "HTG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "t6tdqz0W4pb5",
                            "createdDate": 1744213796035,
                            "name": "HUF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IxyvygnIujt5",
                            "createdDate": 1744213796035,
                            "name": "IDR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rGIQDIZiT6EQ",
                            "createdDate": 1744213796035,
                            "name": "ILS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cdYvu1whpYSA",
                            "createdDate": 1744213796035,
                            "name": "INR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rjoPDQnpeees",
                            "createdDate": 1744213796035,
                            "name": "IQD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UDX8_7m8c28q",
                            "createdDate": 1744213796035,
                            "name": "IRR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wEiBeTvUqhs6",
                            "createdDate": 1744213796035,
                            "name": "ISK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sLzMF1Vrl5_c",
                            "createdDate": 1744213796035,
                            "name": "JEP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "dFJqnrai2Z_l",
                            "createdDate": 1744213796035,
                            "name": "JMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_a22gmWME3VU",
                            "createdDate": 1744213796035,
                            "name": "JOD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uAZNtkDv-fR0",
                            "createdDate": 1744213796035,
                            "name": "JPY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "806iGbId7yfQ",
                            "createdDate": 1744213796035,
                            "name": "KES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lgDPiwPra5Lx",
                            "createdDate": 1744213796035,
                            "name": "KGS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7Yjz8gAXSivC",
                            "createdDate": 1744213796035,
                            "name": "KHR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2n4HggqlnlcE",
                            "createdDate": 1744213796035,
                            "name": "KID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "irt5pIdU-sMq",
                            "createdDate": 1744213796036,
                            "name": "KMF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SSeH_Lp_vxcb",
                            "createdDate": 1744213796036,
                            "name": "KRW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SAbBWiJkPTdR",
                            "createdDate": 1744213796036,
                            "name": "KWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fMbLYfEBJGvB",
                            "createdDate": 1744213796036,
                            "name": "KYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nwdJOa3Pea3w",
                            "createdDate": 1744213796036,
                            "name": "KZT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ft2w8iTlIaZj",
                            "createdDate": 1744213796036,
                            "name": "LAK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IThY08yaDRFu",
                            "createdDate": 1744213796036,
                            "name": "LBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cTSzrRQWdSUI",
                            "createdDate": 1744213796036,
                            "name": "LKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9AyHglEZfDGo",
                            "createdDate": 1744213796036,
                            "name": "LRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YZMul31ouFXm",
                            "createdDate": 1744213796036,
                            "name": "LSL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UlKx2bWwLA7S",
                            "createdDate": 1744213796036,
                            "name": "LTL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OLHysZqzOXcT",
                            "createdDate": 1744213796036,
                            "name": "LVL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "D6aUGZzdu7Yi",
                            "createdDate": 1744213796036,
                            "name": "LYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qIJh3EEBJEfQ",
                            "createdDate": 1744213796036,
                            "name": "MAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MMVuRDQ9D3Vy",
                            "createdDate": 1744213796036,
                            "name": "MDL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jo706fMN9QAq",
                            "createdDate": 1744213796036,
                            "name": "MGA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mP6aKkfZ95BO",
                            "createdDate": 1744213796036,
                            "name": "MKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DX8kkVzGYHbi",
                            "createdDate": 1744213796036,
                            "name": "MMK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5ZVwPJKBFlXE",
                            "createdDate": 1744213796037,
                            "name": "MNT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "b3OYvfl1DbIV",
                            "createdDate": 1744213796037,
                            "name": "MOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_7yu7Zqs-xrg",
                            "createdDate": 1744213796037,
                            "name": "MRU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "m5vv9ktHbwfb",
                            "createdDate": 1744213796037,
                            "name": "MUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9d5WUZJY9pcW",
                            "createdDate": 1744213796037,
                            "name": "MVR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "YkXYzIzfEhg4",
                            "createdDate": 1744213796037,
                            "name": "MWK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Los1JY71RI1G",
                            "createdDate": 1744213796037,
                            "name": "MXN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ALhm_x65rliR",
                            "createdDate": 1744213796037,
                            "name": "MYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "K964cOVaFhNt",
                            "createdDate": 1744213796037,
                            "name": "MZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "P_JOm7_FG9yw",
                            "createdDate": 1744213796037,
                            "name": "NAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bC2VX76zv-lK",
                            "createdDate": 1744213796037,
                            "name": "NGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yNY0tEAs2D-t",
                            "createdDate": 1744213796037,
                            "name": "NIO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "g9oGdpq6L3U4",
                            "createdDate": 1744213796037,
                            "name": "NOK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jnraEqFH-roW",
                            "createdDate": 1744213796037,
                            "name": "NPR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Hgcm8CwH5Qxg",
                            "createdDate": 1744213796037,
                            "name": "NZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "i4BIiGU9SFcr",
                            "createdDate": 1744213796038,
                            "name": "OMR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xo5lhu3n_KMn",
                            "createdDate": 1744213796038,
                            "name": "PAB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8dLRcja3HtdT",
                            "createdDate": 1744213796038,
                            "name": "PEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rZNn6U_Eo_FP",
                            "createdDate": 1744213796038,
                            "name": "PGK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GyKjX1K1NcN4",
                            "createdDate": 1744213796038,
                            "name": "PHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qvAl9psRN3pv",
                            "createdDate": 1744213796038,
                            "name": "PKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TcndBWI_L0zF",
                            "createdDate": 1744213796038,
                            "name": "PLN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RVafzzBMvuqL",
                            "createdDate": 1744213796038,
                            "name": "PYG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "q-Ve7sepmTrY",
                            "createdDate": 1744213796038,
                            "name": "QAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Q4pQ6BQooHbZ",
                            "createdDate": 1744213796038,
                            "name": "RON",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9nfQwIX2lXJn",
                            "createdDate": 1744213796038,
                            "name": "RSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_icgvsQSiNZ5",
                            "createdDate": 1744213796038,
                            "name": "RUB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "z0fKfRrltbkG",
                            "createdDate": 1744213796038,
                            "name": "RWF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vN5xIVHK7trI",
                            "createdDate": 1744213796038,
                            "name": "SAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "A5J349CO1R6V",
                            "createdDate": 1744213796038,
                            "name": "SBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ySDRLcEOvusE",
                            "createdDate": 1744213796038,
                            "name": "SCR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ctm3ZH8WqMNK",
                            "createdDate": 1744213796038,
                            "name": "SDG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7_-pulMbYbU_",
                            "createdDate": 1744213796038,
                            "name": "SEK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pPShA4UTJntW",
                            "createdDate": 1744213796038,
                            "name": "SGD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PQp6x_DEe_ps",
                            "createdDate": 1744213796038,
                            "name": "SHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "jHHGG-qhkTuT",
                            "createdDate": 1744213796039,
                            "name": "SLL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eF3pcJYPyPbM",
                            "createdDate": 1744213796039,
                            "name": "SOS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "f-pgs-KORsRg",
                            "createdDate": 1744213796039,
                            "name": "SRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HO83-tlE1KHj",
                            "createdDate": 1744213796039,
                            "name": "SSP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Gigit7kanOeU",
                            "createdDate": 1744213796039,
                            "name": "STD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Z9pOPKQtcD0m",
                            "createdDate": 1744213796039,
                            "name": "SYP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UagGouzxG2YN",
                            "createdDate": 1744213796039,
                            "name": "SZL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "vKF3XadcpmmZ",
                            "createdDate": 1744213796039,
                            "name": "THB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5AQ4siV7hcRW",
                            "createdDate": 1744213796039,
                            "name": "TJS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "DkJS-Nz4DjY0",
                            "createdDate": 1744213796039,
                            "name": "TMT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AMbNE2z9jneE",
                            "createdDate": 1744213796039,
                            "name": "TND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Iig17ySnPj5F",
                            "createdDate": 1744213796039,
                            "name": "TOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zUD_P8yEvOGr",
                            "createdDate": 1744213796039,
                            "name": "TRY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "csIMih7CP1Yu",
                            "createdDate": 1744213796039,
                            "name": "TTD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wrIMvXdpmsB2",
                            "createdDate": 1744213796039,
                            "name": "TWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nxBA9teiND2R",
                            "createdDate": 1744213796039,
                            "name": "TZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mfvMIsBsqj6I",
                            "createdDate": 1744213796040,
                            "name": "UAH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gZzd5oHpsMA7",
                            "createdDate": 1744213796040,
                            "name": "UGX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IDK_gEb4Q-Yh",
                            "createdDate": 1744213796040,
                            "name": "USD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VDTdIbqWHMaw",
                            "createdDate": 1744213796040,
                            "name": "UYU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lCzwh3oncYGn",
                            "createdDate": 1744213796040,
                            "name": "UZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "L1xE-Lkjhyry",
                            "createdDate": 1744213796040,
                            "name": "VEF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "JPjG-aRA5YN9",
                            "createdDate": 1744213796040,
                            "name": "VES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nPk-XouGTKOP",
                            "createdDate": 1744213796040,
                            "name": "VND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aivt4o0nDdL_",
                            "createdDate": 1744213796040,
                            "name": "VUV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0nkie_k7B09y",
                            "createdDate": 1744213796040,
                            "name": "WST",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "D-2YhO2OM3d6",
                            "createdDate": 1744213796040,
                            "name": "XAF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "w4809EKvhaI0",
                            "createdDate": 1744213796040,
                            "name": "XCD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "a0hsW3QtZzSK",
                            "createdDate": 1744213796040,
                            "name": "XOF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "SLIrBLC2HXJC",
                            "createdDate": 1744213796040,
                            "name": "XPF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_WkIsFhQa2N1",
                            "createdDate": 1744213796040,
                            "name": "XXX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Uh3G2nqPkrC0",
                            "createdDate": 1744213796040,
                            "name": "YER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zYV8dHpW8nqB",
                            "createdDate": 1744213796040,
                            "name": "ZAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "sUfd9miwNPQa",
                            "createdDate": 1744213796040,
                            "name": "ZMW",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-customer_email": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-customer_email",
                "name": "Customer Email",
                "apiIdentifier": "customerEmail",
                "configuration": {
                    "type": "StringConfig",
                    "key": "C74Fd_uo9vOY",
                    "createdDate": "2025-04-09T15:49:56.041Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-disabled_webhooks": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-disabled_webhooks",
                "name": "Disabled Webhooks",
                "apiIdentifier": "disabledWebhooks",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "W9TBDO88kNfI",
                    "createdDate": "2025-04-09T15:49:56.086Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-domain": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-domain",
                "name": "Domain",
                "apiIdentifier": "domain",
                "configuration": {
                    "type": "StringConfig",
                    "key": "CPDtIIteG_iS",
                    "createdDate": "2025-04-09T15:49:56.041Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-eligible_for_payments": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-eligible_for_payments",
                "name": "Eligible For Payments",
                "apiIdentifier": "eligibleForPayments",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "7zAZD942zosL",
                    "createdDate": "2025-04-09T15:49:56.042Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-email": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-email",
                "name": "Email",
                "apiIdentifier": "email",
                "configuration": {
                    "type": "StringConfig",
                    "key": "ilhFpoPypCR2",
                    "createdDate": "2025-04-09T15:49:56.042Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-enabled_presentment_currencies-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Shop-enabled_presentment_currencies-Enum",
                "name": "Enabled Presentment Currencies",
                "apiIdentifier": "enabledPresentmentCurrencies",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "ofWDq8ftTS-A",
                    "createdDate": "2025-04-09T15:49:56.042Z",
                    "allowMultiple": true,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "4I-0ZFtxPQYt",
                            "createdDate": 1744213796042,
                            "name": "AED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "teUOWj7tWSid",
                            "createdDate": 1744213796042,
                            "name": "AFN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "T7ETafjtJ8pI",
                            "createdDate": 1744213796043,
                            "name": "ALL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0pDrM3hwM_Wc",
                            "createdDate": 1744213796043,
                            "name": "AMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ejlhiN1_FOBm",
                            "createdDate": 1744213796043,
                            "name": "ANG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QXYavQUI82E9",
                            "createdDate": 1744213796043,
                            "name": "AOA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kOoE-9pGzzfM",
                            "createdDate": 1744213796043,
                            "name": "ARS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "AN6P4JQB0edI",
                            "createdDate": 1744213796043,
                            "name": "AUD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wuI8h3T2ijRv",
                            "createdDate": 1744213796043,
                            "name": "AWG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "7zJ6ygSn_5nr",
                            "createdDate": 1744213796043,
                            "name": "AZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "XAU808hsPQKs",
                            "createdDate": 1744213796043,
                            "name": "BAM",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "K7otQosB8oA-",
                            "createdDate": 1744213796043,
                            "name": "BBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9-1UO6prts-q",
                            "createdDate": 1744213796043,
                            "name": "BDT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0bK7MIsGsr13",
                            "createdDate": 1744213796043,
                            "name": "BGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "6LOId_Dai23Y",
                            "createdDate": 1744213796043,
                            "name": "BHD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Rk5WfXNso1aG",
                            "createdDate": 1744213796043,
                            "name": "BIF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "L19DVIYtbdib",
                            "createdDate": 1744213796043,
                            "name": "BMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ju97_tqI0Q7P",
                            "createdDate": 1744213796043,
                            "name": "BND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yHc-u0XFlDso",
                            "createdDate": 1744213796043,
                            "name": "BOB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aw7zdMRr5p2t",
                            "createdDate": 1744213796043,
                            "name": "BRL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2iGneYdHY5h3",
                            "createdDate": 1744213796043,
                            "name": "BSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yEnKbNE6-X5k",
                            "createdDate": 1744213796044,
                            "name": "BTN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LBsLxswMltgh",
                            "createdDate": 1744213796044,
                            "name": "BWP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "PvAOcMDwuGeC",
                            "createdDate": 1744213796044,
                            "name": "BYN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LYyMnFOnbkbH",
                            "createdDate": 1744213796044,
                            "name": "BYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-WUUnvmFx6Ij",
                            "createdDate": 1744213796044,
                            "name": "BZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aR1iNu_kM6pR",
                            "createdDate": 1744213796044,
                            "name": "CAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1libzu0jsM_a",
                            "createdDate": 1744213796044,
                            "name": "CDF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-G4fuAyR7JB4",
                            "createdDate": 1744213796044,
                            "name": "CHF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uLH3rBgODX_J",
                            "createdDate": 1744213796044,
                            "name": "CLP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "l-pL1re_GAf3",
                            "createdDate": 1744213796044,
                            "name": "CNY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aKqtRDDrnuwa",
                            "createdDate": 1744213796044,
                            "name": "COP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "IgMdTJlVsFuZ",
                            "createdDate": 1744213796044,
                            "name": "CRC",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LyEyi-LLW4zK",
                            "createdDate": 1744213796044,
                            "name": "CVE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "MaGscbKxqqHh",
                            "createdDate": 1744213796044,
                            "name": "CZK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "d37swuF_4Yll",
                            "createdDate": 1744213796044,
                            "name": "DJF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BnxCblrJ0UxN",
                            "createdDate": 1744213796044,
                            "name": "DKK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4ctPh0aZyCom",
                            "createdDate": 1744213796044,
                            "name": "DOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "71rOUXsVKrBo",
                            "createdDate": 1744213796044,
                            "name": "DZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "m87ny7Iuqs0U",
                            "createdDate": 1744213796044,
                            "name": "EGP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NRX-k-I6PaJg",
                            "createdDate": 1744213796045,
                            "name": "ERN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GWtsANBFvaud",
                            "createdDate": 1744213796045,
                            "name": "ETB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "S9ZviF955Cb3",
                            "createdDate": 1744213796045,
                            "name": "EUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "FNvT309XN8Td",
                            "createdDate": 1744213796045,
                            "name": "FJD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "V7RMqOFruYeI",
                            "createdDate": 1744213796045,
                            "name": "FKP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "L614UteHFZ4P",
                            "createdDate": 1744213796045,
                            "name": "GBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NA6ggUcy_Lrg",
                            "createdDate": 1744213796045,
                            "name": "GEL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "I5uNKSLOs9kr",
                            "createdDate": 1744213796045,
                            "name": "GHS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "eRwB6hkhSdH6",
                            "createdDate": 1744213796045,
                            "name": "GIP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rJWttf-SpcBI",
                            "createdDate": 1744213796045,
                            "name": "GMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "M9tcMQ0Itt63",
                            "createdDate": 1744213796045,
                            "name": "GNF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RqPtoe5dxdmh",
                            "createdDate": 1744213796045,
                            "name": "GTQ",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mFnHutD18PC5",
                            "createdDate": 1744213796045,
                            "name": "GYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "T4eUSy5FXV-z",
                            "createdDate": 1744213796045,
                            "name": "HKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "viQGQnOCSZN4",
                            "createdDate": 1744213796045,
                            "name": "HNL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "bOBdZUNfyNjc",
                            "createdDate": 1744213796045,
                            "name": "HRK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KSrrrpc-6DpC",
                            "createdDate": 1744213796045,
                            "name": "HTG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "QnbdfhG4epFq",
                            "createdDate": 1744213796045,
                            "name": "HUF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "K8jh-u6jKLkS",
                            "createdDate": 1744213796045,
                            "name": "IDR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "C1UvKNXvbAqP",
                            "createdDate": 1744213796046,
                            "name": "ILS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0sbUAenn8Pcf",
                            "createdDate": 1744213796046,
                            "name": "INR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "1XlFJrCjWn5L",
                            "createdDate": 1744213796046,
                            "name": "IQD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5uxpDRXblmyE",
                            "createdDate": 1744213796046,
                            "name": "IRR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "g_J8q1fHohrI",
                            "createdDate": 1744213796046,
                            "name": "ISK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wFbB0zHCitIT",
                            "createdDate": 1744213796046,
                            "name": "JEP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ivbFGGITqXUw",
                            "createdDate": 1744213796046,
                            "name": "JMD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UOmN51tRaJKC",
                            "createdDate": 1744213796046,
                            "name": "JOD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "e19WD_lQIA3m",
                            "createdDate": 1744213796046,
                            "name": "JPY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LhbSoyFa8DyF",
                            "createdDate": 1744213796046,
                            "name": "KES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rvXBlYQ3p62e",
                            "createdDate": 1744213796046,
                            "name": "KGS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "R4ADr25AURze",
                            "createdDate": 1744213796046,
                            "name": "KHR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "C88MAKS06ixB",
                            "createdDate": 1744213796046,
                            "name": "KID",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "h9y4d0IfiU6E",
                            "createdDate": 1744213796046,
                            "name": "KMF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "aFYuR8UI9yqJ",
                            "createdDate": 1744213796046,
                            "name": "KRW",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "pGEqrUlc12mz",
                            "createdDate": 1744213796046,
                            "name": "KWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4RAruc1nSZqn",
                            "createdDate": 1744213796046,
                            "name": "KYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Ul2rlyVGGCII",
                            "createdDate": 1744213796047,
                            "name": "KZT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "N5ALQtUccUJb",
                            "createdDate": 1744213796047,
                            "name": "LAK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9y4QHRv2K8I8",
                            "createdDate": 1744213796047,
                            "name": "LBP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "w_66Ay1sjx8X",
                            "createdDate": 1744213796047,
                            "name": "LKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "TiNd9MOqXUIs",
                            "createdDate": 1744213796047,
                            "name": "LRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xt2lOiwsZmUT",
                            "createdDate": 1744213796047,
                            "name": "LSL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zGBzMHY0-nSj",
                            "createdDate": 1744213796047,
                            "name": "LTL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GO6WLPytpDgs",
                            "createdDate": 1744213796047,
                            "name": "LVL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HNVYiWGl3PRb",
                            "createdDate": 1744213796050,
                            "name": "LYD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "z-jRJ8hmfHXm",
                            "createdDate": 1744213796050,
                            "name": "MAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4NxsUlBhc7Yp",
                            "createdDate": 1744213796050,
                            "name": "MDL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ea9sT5ntx0j0",
                            "createdDate": 1744213796050,
                            "name": "MGA",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-DHPoki3FbAE",
                            "createdDate": 1744213796050,
                            "name": "MKD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "NGOCbxn4KKWd",
                            "createdDate": 1744213796050,
                            "name": "MMK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uwzJUUvn_vaJ",
                            "createdDate": 1744213796051,
                            "name": "MNT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "520TJ_BESs2J",
                            "createdDate": 1744213796051,
                            "name": "MOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HbOqa7V0dBN8",
                            "createdDate": 1744213796051,
                            "name": "MRU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5iUcRfF_L_-E",
                            "createdDate": 1744213796051,
                            "name": "MUR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "z1_he_IZtxQ2",
                            "createdDate": 1744213796051,
                            "name": "MVR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "rNmExOhVF7jv",
                            "createdDate": 1744213796051,
                            "name": "MWK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BOLh0oy2nE-4",
                            "createdDate": 1744213796051,
                            "name": "MXN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "BtxMrn7lOAEK",
                            "createdDate": 1744213796051,
                            "name": "MYR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ziQMteTCmYjW",
                            "createdDate": 1744213796051,
                            "name": "MZN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "viBpkRyYcZG1",
                            "createdDate": 1744213796051,
                            "name": "NAD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uyeLOpbA-94K",
                            "createdDate": 1744213796051,
                            "name": "NGN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UL29NAsv8hz2",
                            "createdDate": 1744213796051,
                            "name": "NIO",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xACxhY4_xKde",
                            "createdDate": 1744213796051,
                            "name": "NOK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Mocn56SvDJQi",
                            "createdDate": 1744213796051,
                            "name": "NPR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "4dytjtQNmXRH",
                            "createdDate": 1744213796051,
                            "name": "NZD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "d_gR7sO5yMry",
                            "createdDate": 1744213796051,
                            "name": "OMR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "mSy6MdGNCdB6",
                            "createdDate": 1744213796051,
                            "name": "PAB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "UDoNNzU5MJuF",
                            "createdDate": 1744213796051,
                            "name": "PEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "B7kv3yzbV-7B",
                            "createdDate": 1744213796051,
                            "name": "PGK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "_MuEUsT3Yfeb",
                            "createdDate": 1744213796051,
                            "name": "PHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "LjCYud13hFGl",
                            "createdDate": 1744213796052,
                            "name": "PKR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "myqYhdY5QyRm",
                            "createdDate": 1744213796052,
                            "name": "PLN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Li9F161tSxCO",
                            "createdDate": 1744213796052,
                            "name": "PYG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "JI-5-kpnU4cN",
                            "createdDate": 1744213796052,
                            "name": "QAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Wf7zGcodzJiQ",
                            "createdDate": 1744213796052,
                            "name": "RON",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VcT4BSl7haH1",
                            "createdDate": 1744213796052,
                            "name": "RSD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uBIlD3o4oCRf",
                            "createdDate": 1744213796052,
                            "name": "RUB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "iz9-fCJb4ZUy",
                            "createdDate": 1744213796052,
                            "name": "RWF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "oz8Dq-exr45s",
                            "createdDate": 1744213796052,
                            "name": "SAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yQfHKAPaemz-",
                            "createdDate": 1744213796052,
                            "name": "SBD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "ekWtEhHL89wv",
                            "createdDate": 1744213796052,
                            "name": "SCR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lbzU5omN5j6X",
                            "createdDate": 1744213796052,
                            "name": "SDG",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "tFfDEfqd3Zrj",
                            "createdDate": 1744213796052,
                            "name": "SEK",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cG4folK1kL6I",
                            "createdDate": 1744213796052,
                            "name": "SGD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OQ-dsdKx4fEE",
                            "createdDate": 1744213796052,
                            "name": "SHP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "cpvja8ZKlSCi",
                            "createdDate": 1744213796052,
                            "name": "SLL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "yDNQJ1DdaXtC",
                            "createdDate": 1744213796052,
                            "name": "SOS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "junMV31nna2S",
                            "createdDate": 1744213796052,
                            "name": "SRD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "0ql7zENOsItq",
                            "createdDate": 1744213796052,
                            "name": "SSP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lcNP4rCCVMQi",
                            "createdDate": 1744213796052,
                            "name": "STD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Aa_tEhvJr5Gv",
                            "createdDate": 1744213796052,
                            "name": "SYP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2moz5PjeZ1Pt",
                            "createdDate": 1744213796052,
                            "name": "SZL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "xkr3361g3Fej",
                            "createdDate": 1744213796053,
                            "name": "THB",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gVJUORfEnmfg",
                            "createdDate": 1744213796053,
                            "name": "TJS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "q9eLGjE-POph",
                            "createdDate": 1744213796053,
                            "name": "TMT",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "kYL0df1D_NFv",
                            "createdDate": 1744213796053,
                            "name": "TND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "U4XJfc4JqIff",
                            "createdDate": 1744213796053,
                            "name": "TOP",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "zaxVlAC7G7V9",
                            "createdDate": 1744213796053,
                            "name": "TRY",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "864MsFubh2gR",
                            "createdDate": 1744213796053,
                            "name": "TTD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "E6Jqep3KrOVz",
                            "createdDate": 1744213796053,
                            "name": "TWD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "lMWdIunT8uLN",
                            "createdDate": 1744213796053,
                            "name": "TZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "L9huTA635Q-g",
                            "createdDate": 1744213796053,
                            "name": "UAH",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "OKg6L3f7vQPs",
                            "createdDate": 1744213796053,
                            "name": "UGX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "nacRP499j9zK",
                            "createdDate": 1744213796053,
                            "name": "USD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KUjworn846nK",
                            "createdDate": 1744213796053,
                            "name": "UYU",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "X12W1XO1qZX6",
                            "createdDate": 1744213796053,
                            "name": "UZS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "Zp-vpa1XVK27",
                            "createdDate": 1744213796053,
                            "name": "VEF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5-ydlg9Dqqpa",
                            "createdDate": 1744213796053,
                            "name": "VES",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "R4o_OQgwKb_R",
                            "createdDate": 1744213796053,
                            "name": "VND",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "9xzCOd4Xr9qh",
                            "createdDate": 1744213796053,
                            "name": "VUV",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "VdOVy0dvVJym",
                            "createdDate": 1744213796053,
                            "name": "WST",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "-WOQJCr89SMB",
                            "createdDate": 1744213796053,
                            "name": "XAF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "5s5oGLxzcaIl",
                            "createdDate": 1744213796053,
                            "name": "XCD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "KzXQc33Rbhh0",
                            "createdDate": 1744213796053,
                            "name": "XOF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "2pWyncV7DvOR",
                            "createdDate": 1744213796053,
                            "name": "XPF",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "qsEJPpEz60WS",
                            "createdDate": 1744213796054,
                            "name": "XXX",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "gdLMvEpRIvYx",
                            "createdDate": 1744213796054,
                            "name": "YER",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "GPZHGvZy4AXp",
                            "createdDate": 1744213796054,
                            "name": "ZAR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "hVuWvX-KrG4t",
                            "createdDate": 1744213796054,
                            "name": "ZMW",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-finances": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-finances",
                "name": "Finances",
                "apiIdentifier": "finances",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "FU50ckHpY_IN",
                    "createdDate": "2025-04-09T15:49:56.054Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-google_apps_domain": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-google_apps_domain",
                "name": "Google Apps Domain",
                "apiIdentifier": "googleAppsDomain",
                "configuration": {
                    "type": "StringConfig",
                    "key": "djDSNoXI9Eyl",
                    "createdDate": "2025-04-09T15:49:56.055Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-google_apps_login_enabled": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-google_apps_login_enabled",
                "name": "Google Apps Login Enabled",
                "apiIdentifier": "googleAppsLoginEnabled",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "mXMeTnEKYQqo",
                    "createdDate": "2025-04-09T15:49:56.055Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-granted_scopes": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-granted_scopes",
                "name": "Granted Scopes",
                "apiIdentifier": "grantedScopes",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "LEwH6rnubKp9",
                    "createdDate": "2025-04-09T15:49:56.085Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-has_discounts": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-has_discounts",
                "name": "Has Discounts",
                "apiIdentifier": "hasDiscounts",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "KbUtop7eWt0B",
                    "createdDate": "2025-04-09T15:49:56.055Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-has_gift_cards": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-has_gift_cards",
                "name": "Has Gift Cards",
                "apiIdentifier": "hasGiftCards",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "zBe9KpqW2P-v",
                    "createdDate": "2025-04-09T15:49:56.055Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-has_storefront": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-has_storefront",
                "name": "Has Storefront",
                "apiIdentifier": "hasStorefront",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "XgI3A038C2a4",
                    "createdDate": "2025-04-09T15:49:56.056Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-iana_timezone": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-iana_timezone",
                "name": "Iana Timezone",
                "apiIdentifier": "ianaTimezone",
                "configuration": {
                    "type": "StringConfig",
                    "key": "ZwbrbxcXcS7W",
                    "createdDate": "2025-04-09T15:49:56.056Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-installed_via_api_key": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-installed_via_api_key",
                "name": "Installed Via API Key",
                "apiIdentifier": "installedViaApiKey",
                "configuration": {
                    "type": "StringConfig",
                    "key": "IyzKFVXCho3F",
                    "createdDate": "2025-04-09T15:49:56.086Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-latitude": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Shop-latitude",
                "name": "Latitude",
                "apiIdentifier": "latitude",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "wAG_sYjS03a5",
                    "createdDate": "2025-04-09T15:49:56.056Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-longitude": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-Shop-longitude",
                "name": "Longitude",
                "apiIdentifier": "longitude",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "_XIRlYGsbrNG",
                    "createdDate": "2025-04-09T15:49:56.056Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-marketing_sms_consent_enabled_at_checkout": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-marketing_sms_consent_enabled_at_checkout",
                "name": "Marketing SMS Content Enabled at Checkout",
                "apiIdentifier": "marketingSmsContentEnabledAtCheckout",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "pVcvNhMFI3j9",
                    "createdDate": "2025-04-09T15:49:56.084Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-money_format": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-money_format",
                "name": "Money Format",
                "apiIdentifier": "moneyFormat",
                "configuration": {
                    "type": "StringConfig",
                    "key": "TbqWO3oo6pqQ",
                    "createdDate": "2025-04-09T15:49:56.057Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-money_in_emails_format": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-money_in_emails_format",
                "name": "Money In Emails Format",
                "apiIdentifier": "moneyInEmailsFormat",
                "configuration": {
                    "type": "StringConfig",
                    "key": "iL9Z3p0LotV8",
                    "createdDate": "2025-04-09T15:49:56.057Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-money_with_currency_format": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-money_with_currency_format",
                "name": "Money With Currency Format",
                "apiIdentifier": "moneyWithCurrencyFormat",
                "configuration": {
                    "type": "StringConfig",
                    "key": "0OjIeltp2Nxy",
                    "createdDate": "2025-04-09T15:49:56.057Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-money_with_currency_in_emails_format": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-money_with_currency_in_emails_format",
                "name": "Money With Currency In Emails Format",
                "apiIdentifier": "moneyWithCurrencyInEmailsFormat",
                "configuration": {
                    "type": "StringConfig",
                    "key": "tTjuI2m_xLtX",
                    "createdDate": "2025-04-09T15:49:56.085Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-multi_location_enabled": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-multi_location_enabled",
                "name": "Multi Location Enabled",
                "apiIdentifier": "multiLocationEnabled",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "cKCrRSDvzcAs",
                    "createdDate": "2025-04-09T15:49:56.058Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-myshopify_domain": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-myshopify_domain",
                "name": "myshopify Domain",
                "apiIdentifier": "myshopifyDomain",
                "configuration": {
                    "type": "StringConfig",
                    "key": "3D2AEUo8voep",
                    "createdDate": "2025-04-09T15:49:56.058Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-name",
                "name": "Name",
                "apiIdentifier": "name",
                "configuration": {
                    "type": "StringConfig",
                    "key": "S1b-IpC2I7c7",
                    "createdDate": "2025-04-09T15:49:56.058Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-password_enabled": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-password_enabled",
                "name": "Password Enabled",
                "apiIdentifier": "passwordEnabled",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "Z_veP9nKsnc0",
                    "createdDate": "2025-04-09T15:49:56.059Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-phone": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-phone",
                "name": "Phone",
                "apiIdentifier": "phone",
                "configuration": {
                    "type": "StringConfig",
                    "key": "TsuJvMLMXBFA",
                    "createdDate": "2025-04-09T15:49:56.059Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-plan_display_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-plan_display_name",
                "name": "Plan Display Name",
                "apiIdentifier": "planDisplayName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "pLNwBgszrze0",
                    "createdDate": "2025-04-09T15:49:56.059Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-plan_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-plan_name",
                "name": "Plan Name",
                "apiIdentifier": "planName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "mefBBTp9fWCh",
                    "createdDate": "2025-04-09T15:49:56.060Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-pre_launch_enabled": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-pre_launch_enabled",
                "name": "Pre Launch Enabled",
                "apiIdentifier": "preLaunchEnabled",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "ijdYkSJFC7Q0",
                    "createdDate": "2025-04-09T15:49:56.060Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-primary_locale": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-primary_locale",
                "name": "Primary Locale",
                "apiIdentifier": "primaryLocale",
                "configuration": {
                    "type": "StringConfig",
                    "key": "_ZmPCkkRfDRJ",
                    "createdDate": "2025-04-09T15:49:56.060Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-province": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-province",
                "name": "Province",
                "apiIdentifier": "province",
                "configuration": {
                    "type": "StringConfig",
                    "key": "8zirAPbs8lJz",
                    "createdDate": "2025-04-09T15:49:56.061Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-province_code": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-province_code",
                "name": "Province Code",
                "apiIdentifier": "provinceCode",
                "configuration": {
                    "type": "StringConfig",
                    "key": "p2CDaaz22MwQ",
                    "createdDate": "2025-04-09T15:49:56.061Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-registered_webhooks": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Shop-registered_webhooks",
                "name": "Registered Webhooks",
                "apiIdentifier": "registeredWebhooks",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "wzNRpcLZQXGe",
                    "createdDate": "2025-04-09T15:49:56.085Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-requires_extra_payments_agreement": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-requires_extra_payments_agreement",
                "name": "Requires Extra Payments Agreement",
                "apiIdentifier": "requiresExtraPaymentsAgreement",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "TTZON-NbQiF5",
                    "createdDate": "2025-04-09T15:49:56.061Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-setup_required": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Shop-setup_required",
                "name": "Setup Required",
                "apiIdentifier": "setupRequired",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "zGf6U6ITcJJz",
                    "createdDate": "2025-04-09T15:49:56.062Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-shop_owner": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-shop_owner",
                "name": "Shop Owner",
                "apiIdentifier": "shopOwner",
                "configuration": {
                    "type": "StringConfig",
                    "key": "ULLYKhd8hJaY",
                    "createdDate": "2025-04-09T15:49:56.062Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-source": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Shop-source",
                "name": "Source",
                "apiIdentifier": "source",
                "configuration": {
                    "type": "StringConfig",
                    "key": "_OY_SxofR7A4",
                    "createdDate": "2025-04-09T15:49:56.063Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Shop-updated_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Shop-updated_at",
                "name": "Shopify Updated At",
                "apiIdentifier": "shopifyUpdatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "ir59dAlQWlha",
                    "createdDate": "2025-04-09T15:49:56.063Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-Syncs": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-Syncs",
                "name": "Syncs",
                "apiIdentifier": "syncs",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "vyDcT63UNir4",
                    "createdDate": "2025-04-09T15:49:56.085Z",
                    "relatedModelKey": "DataModel-Shopify-Sync",
                    "inverseFieldKey": "ModelField-Shopify-Sync-Shop",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-GDPRRequests": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-GDPRRequests",
                "name": "GDPR Requests",
                "apiIdentifier": "gdprRequests",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "LJeuIh5c4v-B",
                    "createdDate": "2025-04-10T07:26:38.527Z",
                    "relatedModelKey": "DataModel-Shopify-GdprRequest",
                    "inverseFieldKey": "ModelField-Shopify-GdprRequest-Shop",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-FulfillmentOrders": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-FulfillmentOrders",
                "name": "Fulfillment Orders",
                "apiIdentifier": "fulfillmentOrders",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "LhetZUJ6JFkM",
                    "createdDate": "2025-04-10T07:48:29.458Z",
                    "relatedModelKey": "DataModel-Shopify-FulfillmentOrder",
                    "inverseFieldKey": "ModelField-Shopify-FulfillmentOrder-Shop",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-FulfillmentServices": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-FulfillmentServices",
                "name": "Fulfillment Services",
                "apiIdentifier": "fulfillmentServices",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "xqWwsdFLJMzY",
                    "createdDate": "2025-04-10T07:48:29.460Z",
                    "relatedModelKey": "DataModel-Shopify-FulfillmentService",
                    "inverseFieldKey": "ModelField-Shopify-FulfillmentService-Shop",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-Fulfillments": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-Fulfillments",
                "name": "Fulfillments",
                "apiIdentifier": "fulfillments",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "WwvIk9TEjBPW",
                    "createdDate": "2025-04-10T07:48:29.457Z",
                    "relatedModelKey": "DataModel-Shopify-Fulfillment",
                    "inverseFieldKey": "ModelField-Shopify-Fulfillment-Shop",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-Customers": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-Customers",
                "name": "Customers",
                "apiIdentifier": "customers",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "z22wTlnzCdSX",
                    "createdDate": "2025-05-22T07:52:16.447Z",
                    "relatedModelKey": "DataModel-Shopify-Customer",
                    "inverseFieldKey": "ModelField-Shopify-Customer-Shop",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-Orders": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-Orders",
                "name": "Orders",
                "apiIdentifier": "orders",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "l6atSiSfTegV",
                    "createdDate": "2025-05-22T07:52:16.450Z",
                    "relatedModelKey": "DataModel-Shopify-Order",
                    "inverseFieldKey": "ModelField-Shopify-Order-Shop",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-ProductVariants": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-ProductVariants",
                "name": "Product Variants",
                "apiIdentifier": "productVariants",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "VAo7X_zRYBvE",
                    "createdDate": "2025-05-22T07:52:16.449Z",
                    "relatedModelKey": "DataModel-Shopify-ProductVariant",
                    "inverseFieldKey": "ModelField-Shopify-ProductVariant-Shop",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Shop-Products": {
                "fieldType": "HasMany",
                "key": "ModelField-Shopify-Shop-Products",
                "name": "Products",
                "apiIdentifier": "products",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "z8aPCpemPCcK",
                    "createdDate": "2025-05-22T07:52:16.448Z",
                    "relatedModelKey": "DataModel-Shopify-Product",
                    "inverseFieldKey": "ModelField-Shopify-Product-Shop",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "ignore",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyShop",
        "stateChart": {
            "type": "StateChart",
            "key": "qFIol8P01hbq",
            "createdDate": 1744213796001,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Shop-Start",
                    "createdDate": 1744213796003,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Shop-Created",
                    "createdDate": 1744213796003,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [
                        {
                            "type": "State",
                            "key": "State-Shopify-Shop-Installed",
                            "createdDate": 1744213796014,
                            "name": "Installed",
                            "isRecordBirthPlace": false,
                            "isUndeleteableSystemState": false,
                            "restoreHistory": true,
                            "childStates": [],
                            "customApiIdentifier": null
                        },
                        {
                            "type": "State",
                            "key": "State-Shopify-Shop-Uninstalled",
                            "createdDate": 1744213796014,
                            "name": "Uninstalled",
                            "isRecordBirthPlace": false,
                            "isUndeleteableSystemState": false,
                            "restoreHistory": true,
                            "childStates": [],
                            "customApiIdentifier": null
                        }
                    ],
                    "initialChildState": "State-Shopify-Shop-Installed",
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Shop-Deleted",
                    "createdDate": 1744213796003,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Shop-Start"
        }
    },
    "ShopifySync": {
        "key": "DataModel-Shopify-Sync",
        "name": "shopifySync",
        "apiIdentifier": "shopifySync",
        "namespace": [],
        "fields": {
            "DataModel-Shopify-Sync-system-id": {
                "fieldType": "ID",
                "key": "DataModel-Shopify-Sync-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "OLfdPiYmwI9C",
                    "createdDate": "2025-04-09T15:49:56.821Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Sync-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Sync-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "1QGhlUpD1b5y",
                    "createdDate": "2025-04-09T15:49:56.821Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Sync-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Sync-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "6tYZQvx-3S96",
                    "createdDate": "2025-04-09T15:49:56.822Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Sync-system-state": {
                "fieldType": "RecordState",
                "key": "DataModel-Shopify-Sync-system-state",
                "name": "State",
                "apiIdentifier": "state",
                "configuration": {
                    "type": "RecordStateConfig",
                    "key": "dhqXW7Qz93Jj",
                    "createdDate": "2025-04-09T15:49:56.822Z"
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Sync-syncSince": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Sync-syncSince",
                "name": "Sync Since",
                "apiIdentifier": "syncSince",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "3dMvHRZVwfr5",
                    "createdDate": "2025-04-09T15:49:56.824Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-Domain": {
                "fieldType": "String",
                "key": "ModelField-Shopify-Sync-Domain",
                "name": "Domain",
                "apiIdentifier": "domain",
                "configuration": {
                    "type": "StringConfig",
                    "key": "oaadJy1v7lei",
                    "createdDate": "2025-04-09T15:49:56.823Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-ErrorDetails": {
                "fieldType": "String",
                "key": "ModelField-Shopify-Sync-ErrorDetails",
                "name": "Error Details",
                "apiIdentifier": "errorDetails",
                "configuration": {
                    "type": "StringConfig",
                    "key": "wvfO1-l7vC6F",
                    "createdDate": "2025-04-09T15:49:56.823Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-ErrorMessage": {
                "fieldType": "String",
                "key": "ModelField-Shopify-Sync-ErrorMessage",
                "name": "Error Message",
                "apiIdentifier": "errorMessage",
                "configuration": {
                    "type": "StringConfig",
                    "key": "hY3zg-_4vrpu",
                    "createdDate": "2025-04-09T15:49:56.823Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-Force": {
                "fieldType": "Boolean",
                "key": "ModelField-Shopify-Sync-Force",
                "name": "Force",
                "apiIdentifier": "force",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "w8t6Cc-rbF9Y",
                    "createdDate": "2025-04-09T15:49:56.824Z",
                    "default": false
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-Models": {
                "fieldType": "JSON",
                "key": "ModelField-Shopify-Sync-Models",
                "name": "Models",
                "apiIdentifier": "models",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "LAxcfQ66tAbo",
                    "createdDate": "2025-04-09T15:49:56.824Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Sync-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Sync-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "VvSNMK-HpUcO",
                    "createdDate": "2025-04-09T15:49:56.822Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifySync",
        "stateChart": {
            "type": "StateChart",
            "key": "5WpFp5wwxshn",
            "createdDate": 1744213796799,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Sync-Start",
                    "createdDate": 1744213796799,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Sync-Running",
                    "createdDate": 1744213796800,
                    "name": "Running",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Sync-Completed",
                    "createdDate": 1744213796800,
                    "name": "Completed",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Sync-Errored",
                    "createdDate": 1744213796801,
                    "name": "Errored",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Sync-Start"
        }
    },
    "GoogleSheetConfig": {
        "key": "-aqYKUZT8xF4",
        "name": "googleSheetConfig",
        "apiIdentifier": "googleSheetConfig",
        "namespace": [],
        "fields": {
            "-aqYKUZT8xF4-system-id": {
                "fieldType": "ID",
                "key": "-aqYKUZT8xF4-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "3uhJGM_kJCkx",
                    "createdDate": "2025-04-10T07:26:38.253Z"
                },
                "internalWritable": true
            },
            "-aqYKUZT8xF4-system-createdAt": {
                "fieldType": "DateTime",
                "key": "-aqYKUZT8xF4-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "Z9l5kziFq2aZ",
                    "createdDate": "2025-04-10T07:26:38.254Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "-aqYKUZT8xF4-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "-aqYKUZT8xF4-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "5564wfLDQNLE",
                    "createdDate": "2025-04-10T07:26:38.255Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "6A6f68zlz7rw": {
                "fieldType": "String",
                "key": "6A6f68zlz7rw",
                "name": "orderSheetName",
                "apiIdentifier": "orderSheetName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "ynqy3PcHkUsa",
                    "createdDate": "2025-04-10T07:26:38.261Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ETysa3qT2o3v": {
                "fieldType": "BelongsTo",
                "key": "ETysa3qT2o3v",
                "name": "shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "ffbdrx_QHThe",
                    "createdDate": "2025-04-10T07:26:38.262Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": "shopifyShop"
                },
                "internalWritable": true
            },
            "_nMz7Q50Tm-R": {
                "fieldType": "String",
                "key": "_nMz7Q50Tm-R",
                "name": "customerSheetName",
                "apiIdentifier": "customerSheetName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "jiANnm1qQuZ2",
                    "createdDate": "2025-04-10T07:26:38.260Z",
                    "default": null
                },
                "internalWritable": true
            },
            "by_Z64l3alIc": {
                "fieldType": "String",
                "key": "by_Z64l3alIc",
                "name": "courierApiProvider",
                "apiIdentifier": "courierApiProvider",
                "configuration": {
                    "type": "StringConfig",
                    "key": "LyBooXJtkfkz",
                    "createdDate": "2025-04-10T07:26:38.258Z",
                    "default": null
                },
                "internalWritable": true
            },
            "oR_i3VOD8zfq": {
                "fieldType": "String",
                "key": "oR_i3VOD8zfq",
                "name": "spreadsheetId",
                "apiIdentifier": "spreadsheetId",
                "configuration": {
                    "type": "StringConfig",
                    "key": "65hnL2dHY3sa",
                    "createdDate": "2025-04-10T07:26:38.265Z",
                    "default": null
                },
                "internalWritable": true
            },
            "u6KkpCCHTiJQ": {
                "fieldType": "EncryptedString",
                "key": "u6KkpCCHTiJQ",
                "name": "courierApiKey",
                "apiIdentifier": "courierApiKey",
                "configuration": {
                    "type": "EncryptedStringConfig",
                    "key": "u-g4tHumYHob",
                    "createdDate": "2025-04-10T07:26:38.257Z"
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "GoogleSheetConfig",
        "stateChart": {
            "type": "StateChart",
            "key": "Lk5er1I_gAxI",
            "createdDate": 1744269998251,
            "actions": {},
            "transitions": {},
            "stateInActionCode": false,
            "childStates": []
        }
    },
    "Session": {
        "key": "XJDkWtnKlLTT",
        "name": "session",
        "apiIdentifier": "session",
        "namespace": [],
        "fields": {
            "XJDkWtnKlLTT-system-id": {
                "fieldType": "ID",
                "key": "XJDkWtnKlLTT-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "d-M_I_vKL8gw",
                    "createdDate": "2025-04-10T07:26:38.242Z"
                },
                "internalWritable": true
            },
            "XJDkWtnKlLTT-system-createdAt": {
                "fieldType": "DateTime",
                "key": "XJDkWtnKlLTT-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "ibsqhuD8bmNV",
                    "createdDate": "2025-04-10T07:26:38.244Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "XJDkWtnKlLTT-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "XJDkWtnKlLTT-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "-q54nhlflJe1",
                    "createdDate": "2025-04-10T07:26:38.245Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "Model-Field-Belongs-To-Shop": {
                "fieldType": "BelongsTo",
                "key": "Model-Field-Belongs-To-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "ZgpMGZe9KltZ",
                    "createdDate": "2025-04-10T07:26:38.546Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            },
            "Model-Field-Shopify-SID": {
                "fieldType": "String",
                "key": "Model-Field-Shopify-SID",
                "name": "Shopify SID",
                "apiIdentifier": "shopifySID",
                "configuration": {
                    "type": "StringConfig",
                    "key": "U16rxenOSCht",
                    "createdDate": "2025-04-10T07:26:38.548Z",
                    "default": null
                },
                "internalWritable": true
            },
            "SERSQVPJp4_k": {
                "fieldType": "RoleAssignments",
                "key": "SERSQVPJp4_k",
                "name": "roles",
                "apiIdentifier": "roles",
                "configuration": {
                    "type": "RoleAssignmentsConfig",
                    "key": "TfpaPJiVjibg",
                    "createdDate": "2025-04-10T07:26:38.247Z",
                    "default": [
                        "unauthenticated"
                    ]
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "Session",
        "stateChart": {
            "type": "StateChart",
            "key": "gXiOAStAwgTJ",
            "createdDate": 1744269998241,
            "actions": {},
            "transitions": {},
            "stateInActionCode": false,
            "childStates": []
        }
    },
    "ShopifyFulfillment": {
        "key": "DataModel-Shopify-Fulfillment",
        "name": "shopifyFulfillment",
        "apiIdentifier": "shopifyFulfillment",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-Fulfillment-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-Fulfillment-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "rnsfyexXOgYi",
                    "createdDate": "2025-04-10T07:48:29.895Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Fulfillment-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Fulfillment-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "rJGFfqqH-eWq",
                    "createdDate": "2025-04-10T07:48:29.895Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Fulfillment-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Fulfillment-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "CCNL4SQ58w35",
                    "createdDate": "2025-04-10T07:48:29.895Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-created_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Fulfillment-created_at",
                "name": "Shopify Created At",
                "apiIdentifier": "shopifyCreatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "-tppm5-dZcHt",
                    "createdDate": "2025-04-10T07:48:29.897Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Fulfillment-name",
                "name": "Name",
                "apiIdentifier": "name",
                "configuration": {
                    "type": "StringConfig",
                    "key": "OD6DnpjHE-0e",
                    "createdDate": "2025-04-10T07:48:29.896Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-origin_address": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Fulfillment-origin_address",
                "name": "Origin Address",
                "apiIdentifier": "originAddress",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "CC9j9gb1YB9l",
                    "createdDate": "2025-04-10T07:48:29.896Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-receipt": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Fulfillment-receipt",
                "name": "Receipt",
                "apiIdentifier": "receipt",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "KLJmrzjd571L",
                    "createdDate": "2025-04-10T07:48:29.897Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-service": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Fulfillment-service",
                "name": "Service",
                "apiIdentifier": "service",
                "configuration": {
                    "type": "StringConfig",
                    "key": "b80G2gdSucOA",
                    "createdDate": "2025-04-10T07:48:29.897Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-shipment_status": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Fulfillment-shipment_status",
                "name": "Shipment Status",
                "apiIdentifier": "shipmentStatus",
                "configuration": {
                    "type": "StringConfig",
                    "key": "MBnE29W828w_",
                    "createdDate": "2025-04-10T07:48:29.897Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-status-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Fulfillment-status-Enum",
                "name": "Status",
                "apiIdentifier": "status",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "NV2x26iOGDrW",
                    "createdDate": "2025-04-10T07:48:29.898Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "8N3ctz-Zy-c5",
                            "createdDate": 1744264263045,
                            "name": "CANCELLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "B2FgXVXmG0Uc",
                            "createdDate": 1744264263045,
                            "name": "ERROR",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "wu5MqAojfFoT",
                            "createdDate": 1744264263045,
                            "name": "FAILURE",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "3naaVXtVmDug",
                            "createdDate": 1744264263045,
                            "name": "SUCCESS",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "WsecOvGCplqV",
                            "createdDate": 1744264263045,
                            "name": "OPEN",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "w77XpMIgqWXS",
                            "createdDate": 1744264263045,
                            "name": "PENDING",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-tracking_company": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Fulfillment-tracking_company",
                "name": "Tracking Company",
                "apiIdentifier": "trackingCompany",
                "configuration": {
                    "type": "StringConfig",
                    "key": "hh3KLGXgXPt0",
                    "createdDate": "2025-04-10T07:48:29.898Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-tracking_numbers": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Fulfillment-tracking_numbers",
                "name": "Tracking Numbers",
                "apiIdentifier": "trackingNumbers",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "aOOKg0yUeccV",
                    "createdDate": "2025-04-10T07:48:29.898Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-tracking_urls": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Fulfillment-tracking_urls",
                "name": "Tracking URLs",
                "apiIdentifier": "trackingUrls",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "ehLnucz147Zj",
                    "createdDate": "2025-04-10T07:48:29.899Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Fulfillment-updated_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Fulfillment-updated_at",
                "name": "Shopify Updated At",
                "apiIdentifier": "shopifyUpdatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "jHBEmBvhUgv_",
                    "createdDate": "2025-04-10T07:48:29.897Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Fulfillment-Order": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Fulfillment-Order",
                "name": "Order",
                "apiIdentifier": "order",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "wA9MuKS7jBCe",
                    "createdDate": "2025-04-10T07:48:29.896Z",
                    "relatedModelKey": "DataModel-Shopify-Order",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Fulfillment-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Fulfillment-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "IY2A439Vkz0m",
                    "createdDate": "2025-04-10T07:48:29.901Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyFulfillment",
        "stateChart": {
            "type": "StateChart",
            "key": "m78Mu_mbTd2L",
            "createdDate": 1744271309862,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Fulfillment-Start",
                    "createdDate": 1744271309864,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Fulfillment-Created",
                    "createdDate": 1744271309864,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Fulfillment-Deleted",
                    "createdDate": 1744271309864,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Fulfillment-Start"
        }
    },
    "ShopifyFulfillmentOrder": {
        "key": "DataModel-Shopify-FulfillmentOrder",
        "name": "shopifyFulfillmentOrder",
        "apiIdentifier": "shopifyFulfillmentOrder",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-FulfillmentOrder-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-FulfillmentOrder-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "0K3haEdktfan",
                    "createdDate": "2025-04-10T07:48:30.034Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-FulfillmentOrder-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-FulfillmentOrder-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "XYszzUwyiA-E",
                    "createdDate": "2025-04-10T07:48:30.034Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-FulfillmentOrder-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-FulfillmentOrder-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "F4vM9G4MfUax",
                    "createdDate": "2025-04-10T07:48:30.035Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentOrder-created_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-FulfillmentOrder-created_at",
                "name": "Shopify Created At",
                "apiIdentifier": "shopifyCreatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "nwDI3ejyDu_T",
                    "createdDate": "2025-04-10T07:48:30.037Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentOrder-fulfill_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-FulfillmentOrder-fulfill_at",
                "name": "Fulfill At",
                "apiIdentifier": "fulfillAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "vDRiJSwaPcdO",
                    "createdDate": "2025-04-10T07:48:30.035Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentOrder-fulfill_by": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-FulfillmentOrder-fulfill_by",
                "name": "Fulfill By",
                "apiIdentifier": "fulfillBy",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "EN9-Qq6z5jcm",
                    "createdDate": "2025-04-10T07:48:30.037Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentOrder-international_duties": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-FulfillmentOrder-international_duties",
                "name": "International Duties",
                "apiIdentifier": "internationalDuties",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "NZ78y6dsA1iY",
                    "createdDate": "2025-04-10T07:48:30.036Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentOrder-request_status-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-FulfillmentOrder-request_status-Enum",
                "name": "Request Status",
                "apiIdentifier": "requestStatus",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "8XQpz9rfShwu",
                    "createdDate": "2025-04-10T07:48:30.036Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "MnIFoqm3_ve1",
                            "createdDate": 1744264263178,
                            "name": "DISABLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uV3jWHV9yVCZ",
                            "createdDate": 1744264263178,
                            "name": "INVITED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RajuE8sYy1G1",
                            "createdDate": 1744264263178,
                            "name": "ENABLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "uzKFr6-y3bOh",
                            "createdDate": 1744264263178,
                            "name": "DECLINED",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentOrder-status-Enum": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-FulfillmentOrder-status-Enum",
                "name": "Status",
                "apiIdentifier": "status",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "u6HGiUuIG44g",
                    "createdDate": "2025-04-10T07:48:30.037Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "xvb7PCYJWeSM",
                            "createdDate": 1744264263178,
                            "name": "DISABLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "M09L9aj8emtd",
                            "createdDate": 1744264263178,
                            "name": "INVITED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RnsbLbwy0mxA",
                            "createdDate": 1744264263179,
                            "name": "ENABLED",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "HmJBly5sLqHQ",
                            "createdDate": 1744264263179,
                            "name": "DECLINED",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentOrder-supported_actions": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-FulfillmentOrder-supported_actions",
                "name": "Supported Actions",
                "apiIdentifier": "supportedActions",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "u5bF99v5t9f_",
                    "createdDate": "2025-04-10T07:48:30.037Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentOrder-updated_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-FulfillmentOrder-updated_at",
                "name": "Shopify Updated At",
                "apiIdentifier": "shopifyUpdatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "VoUkw7_bXe1F",
                    "createdDate": "2025-04-10T07:48:30.038Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-FulfillmentOrder-Order": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-FulfillmentOrder-Order",
                "name": "Order",
                "apiIdentifier": "order",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "w4vRgAqFivXZ",
                    "createdDate": "2025-04-10T07:48:30.036Z",
                    "relatedModelKey": "DataModel-Shopify-Order",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-FulfillmentOrder-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-FulfillmentOrder-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "92pKSpQTaEcM",
                    "createdDate": "2025-04-10T07:48:30.043Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyFulfillmentOrder",
        "stateChart": {
            "type": "StateChart",
            "key": "NZc0WFB92Aul",
            "createdDate": 1744271309999,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-FulfillmentOrder-Start",
                    "createdDate": 1744271310000,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-FulfillmentOrder-Created",
                    "createdDate": 1744271310000,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-FulfillmentOrder-Deleted",
                    "createdDate": 1744271310000,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-FulfillmentOrder-Start"
        }
    },
    "ShopifyFulfillmentService": {
        "key": "DataModel-Shopify-FulfillmentService",
        "name": "shopifyFulfillmentService",
        "apiIdentifier": "shopifyFulfillmentService",
        "namespace": [],
        "fields": {
            "DataModel-Shopify-FulfillmentService-system-id": {
                "fieldType": "ID",
                "key": "DataModel-Shopify-FulfillmentService-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "INr1gN4nVdZS",
                    "createdDate": "2025-04-10T07:48:30.165Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-FulfillmentService-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-FulfillmentService-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "BOSRF5wBpkjg",
                    "createdDate": "2025-04-10T07:48:30.166Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-FulfillmentService-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-FulfillmentService-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "eblFC8zQ8JRK",
                    "createdDate": "2025-04-10T07:48:30.166Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-__gadget_graphql_service_name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-__gadget_graphql_service_name",
                "name": "Service Name",
                "apiIdentifier": "serviceName",
                "configuration": {
                    "type": "StringConfig",
                    "key": "CKX39vgxxtNy",
                    "createdDate": "2025-04-10T07:48:30.168Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-__gadget_graphql_type": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-__gadget_graphql_type",
                "name": "Type",
                "apiIdentifier": "type",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "-3pSx6sbaezw",
                    "createdDate": "2025-04-10T07:48:30.169Z",
                    "allowMultiple": false,
                    "allowOther": true,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "fs9KW6wH6BXH",
                            "createdDate": 1744264263326,
                            "name": "GIFT_CARD",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "m6CXfJmUHnhf",
                            "createdDate": 1744264263326,
                            "name": "MANUAL",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "fYXT0JHEI0nG",
                            "createdDate": 1744264263326,
                            "name": "THIRD_PARTY",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-admin_graphql_api_id": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-admin_graphql_api_id",
                "name": "Admin GraphQL API ID",
                "apiIdentifier": "adminGraphqlApiId",
                "configuration": {
                    "type": "StringConfig",
                    "key": "MiYf6gx98cF-",
                    "createdDate": "2025-04-10T07:48:30.166Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-callback_url": {
                "fieldType": "URL",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-callback_url",
                "name": "Callback URL",
                "apiIdentifier": "callbackUrl",
                "configuration": {
                    "type": "URLConfig",
                    "key": "ckT0-56utCAX",
                    "createdDate": "2025-04-10T07:48:30.167Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-format": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-format",
                "name": "Format",
                "apiIdentifier": "format",
                "configuration": {
                    "type": "StringConfig",
                    "key": "R2HuLIl4NdZ2",
                    "createdDate": "2025-04-10T07:48:30.169Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-fulfillment_orders_opt_in": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-fulfillment_orders_opt_in",
                "name": "Fulfillment Orders Opt In",
                "apiIdentifier": "fulfillmentOrdersOptIn",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "Ica883Ktx-Ty",
                    "createdDate": "2025-04-10T07:48:30.168Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-handle": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-handle",
                "name": "Handle",
                "apiIdentifier": "handle",
                "configuration": {
                    "type": "StringConfig",
                    "key": "lEV5zcSlxKMj",
                    "createdDate": "2025-04-10T07:48:30.167Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-inventory_management": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-inventory_management",
                "name": "Inventory Management",
                "apiIdentifier": "inventoryManagement",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "TIMZWYFax8KJ",
                    "createdDate": "2025-04-10T07:48:30.167Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-name": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-name",
                "name": "Name",
                "apiIdentifier": "name",
                "configuration": {
                    "type": "StringConfig",
                    "key": "qoMzW4W2KBt-",
                    "createdDate": "2025-04-10T07:48:30.166Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-permits_sku_sharing": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-permits_sku_sharing",
                "name": "Permits SKU Sharing",
                "apiIdentifier": "permitsSkuSharing",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "PuUmb6tjQEkX",
                    "createdDate": "2025-04-10T07:48:30.168Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-requires_shipping_method": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-requires_shipping_method",
                "name": "Requires Shipping Method",
                "apiIdentifier": "requiresShippingMethod",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "Qo21lbVb831S",
                    "createdDate": "2025-04-10T07:48:30.168Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-FulfillmentService-tracking_support": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-FulfillmentService-tracking_support",
                "name": "Tracking Support",
                "apiIdentifier": "trackingSupport",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "6llrbAqRkciI",
                    "createdDate": "2025-04-10T07:48:30.167Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-FulfillmentService-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-FulfillmentService-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "vFRuni0TDoXk",
                    "createdDate": "2025-04-10T07:48:30.169Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyFulfillmentService",
        "stateChart": {
            "type": "StateChart",
            "key": "p1kAILYkugBU",
            "createdDate": 1744271310132,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-FulfillmentService-Start",
                    "createdDate": 1744271310133,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-FulfillmentService-Created",
                    "createdDate": 1744271310133,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-FulfillmentService-Deleted",
                    "createdDate": 1744271310133,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-FulfillmentService-Start"
        }
    },
    "ShopifyProduct": {
        "key": "DataModel-Shopify-Product",
        "name": "shopifyProduct",
        "apiIdentifier": "shopifyProduct",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-Product-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-Product-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "HLx6dQ3ZVNGb",
                    "createdDate": "2025-04-10T07:48:29.645Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Product-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Product-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "rxwElXZXLnSF",
                    "createdDate": "2025-04-10T07:48:29.645Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-Product-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-Product-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "ZNiukRSp0CfL",
                    "createdDate": "2025-04-10T07:48:29.646Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-created_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Product-created_at",
                "name": "Shopify Created At",
                "apiIdentifier": "shopifyCreatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "YzAE8h9FTiTH",
                    "createdDate": "2025-04-10T07:48:29.648Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-handle": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-handle",
                "name": "Handle",
                "apiIdentifier": "handle",
                "configuration": {
                    "type": "StringConfig",
                    "key": "SEMGWAIFAWtI",
                    "createdDate": "2025-04-10T07:48:29.647Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-product_type": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-product_type",
                "name": "Product Type",
                "apiIdentifier": "productType",
                "configuration": {
                    "type": "StringConfig",
                    "key": "h_-qldy9HvN1",
                    "createdDate": "2025-04-10T07:48:29.647Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-published_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Product-published_at",
                "name": "Published At",
                "apiIdentifier": "publishedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "SaiUREYvB1Cw",
                    "createdDate": "2025-04-10T07:48:29.647Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-status": {
                "fieldType": "Enum",
                "key": "ModelField-DataModel-Shopify-Product-status",
                "name": "Status",
                "apiIdentifier": "status",
                "configuration": {
                    "type": "EnumConfig",
                    "key": "1uQ0rm0-7kV9",
                    "createdDate": "2025-04-10T07:48:29.648Z",
                    "allowMultiple": false,
                    "allowOther": false,
                    "options": [
                        {
                            "type": "EnumOption",
                            "key": "VRJ1j-Cox2KQ",
                            "createdDate": 1744264263996,
                            "name": "active",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "8nkL3PtQVVTV",
                            "createdDate": 1744264263996,
                            "name": "archived",
                            "color": "#FCFCFC"
                        },
                        {
                            "type": "EnumOption",
                            "key": "RYu0owPCAUtu",
                            "createdDate": 1744264263996,
                            "name": "draft",
                            "color": "#FCFCFC"
                        }
                    ],
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-tags": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Product-tags",
                "name": "Tags",
                "apiIdentifier": "tags",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "xSCo_Uj-tUm8",
                    "createdDate": "2025-04-10T07:48:29.649Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-template_suffix": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-template_suffix",
                "name": "Template Suffix",
                "apiIdentifier": "templateSuffix",
                "configuration": {
                    "type": "StringConfig",
                    "key": "VBNx1an64uH8",
                    "createdDate": "2025-04-10T07:48:29.649Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-title": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-title",
                "name": "Title",
                "apiIdentifier": "title",
                "configuration": {
                    "type": "StringConfig",
                    "key": "jeuMPQHXLZoD",
                    "createdDate": "2025-04-10T07:48:29.649Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-updated_at": {
                "fieldType": "DateTime",
                "key": "ModelField-DataModel-Shopify-Product-updated_at",
                "name": "Shopify Updated At",
                "apiIdentifier": "shopifyUpdatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "Gyv_xFUMUJrx",
                    "createdDate": "2025-04-10T07:48:29.648Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-variants": {
                "fieldType": "HasMany",
                "key": "ModelField-DataModel-Shopify-Product-variants",
                "name": "Variants",
                "apiIdentifier": "variants",
                "configuration": {
                    "type": "HasManyConfig",
                    "key": "PDoIAjCOrsiu",
                    "createdDate": "2025-04-10T07:48:29.650Z",
                    "relatedModelKey": "DataModel-Shopify-ProductVariant",
                    "inverseFieldKey": "ModelField-Shopify-ProductVariant-Product",
                    "relatedModelApiIdentifier": null,
                    "inverseFieldApiIdentifier": null,
                    "dependent": "delete",
                    "isJoinModelHasManyField": false
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-vendor": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-vendor",
                "name": "Vendor",
                "apiIdentifier": "vendor",
                "configuration": {
                    "type": "StringConfig",
                    "key": "rhE4fPjRopJF",
                    "createdDate": "2025-04-10T07:48:29.649Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-Product-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-Product-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "nElqV6DJjcVn",
                    "createdDate": "2025-04-12T08:07:24.608Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-__gadget_graphql_category": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Product-__gadget_graphql_category",
                "name": "Category",
                "apiIdentifier": "category",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "XhcdF4PXiifS",
                    "createdDate": "2025-04-12T08:08:15.570Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-__gadget_graphql_compare_at_price_range": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Product-__gadget_graphql_compare_at_price_range",
                "name": "Compare At Price Range",
                "apiIdentifier": "compareAtPriceRange",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "e6mOWzDmxs34",
                    "createdDate": "2025-04-12T08:08:15.580Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-__gadget_graphql_has_variants_that_requires_components": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-Product-__gadget_graphql_has_variants_that_requires_components",
                "name": "Has Variants That Requires Components",
                "apiIdentifier": "hasVariantsThatRequiresComponents",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "Ls1iODFxTUNy",
                    "createdDate": "2025-04-12T08:08:15.572Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-__gadget_graphql_product_category": {
                "fieldType": "JSON",
                "key": "ModelField-DataModel-Shopify-Product-__gadget_graphql_product_category",
                "name": "Product Category",
                "apiIdentifier": "productCategory",
                "configuration": {
                    "type": "JSONConfig",
                    "key": "PIUoYSDkiii_",
                    "createdDate": "2025-04-12T08:08:15.578Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-Product-body_html": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-Product-body_html",
                "name": "Body",
                "apiIdentifier": "body",
                "configuration": {
                    "type": "StringConfig",
                    "key": "p8sLln7gdtuN",
                    "createdDate": "2025-04-12T08:08:15.573Z",
                    "default": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyProduct",
        "stateChart": {
            "type": "StateChart",
            "key": "X-hbiHOvQp59",
            "createdDate": 1744271309510,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-Product-Start",
                    "createdDate": 1744271309511,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Product-Created",
                    "createdDate": 1744271309511,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-Product-Deleted",
                    "createdDate": 1744271309511,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-Product-Start"
        }
    },
    "ShopifyProductVariant": {
        "key": "DataModel-Shopify-ProductVariant",
        "name": "shopifyProductVariant",
        "apiIdentifier": "shopifyProductVariant",
        "namespace": [],
        "fields": {
            "ModelField-DataModel-Shopify-ProductVariant-id": {
                "fieldType": "ID",
                "key": "ModelField-DataModel-Shopify-ProductVariant-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "sw5Qp1YGqqRd",
                    "createdDate": "2025-04-10T07:48:29.769Z"
                },
                "internalWritable": true
            },
            "DataModel-Shopify-ProductVariant-system-createdAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-ProductVariant-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "TbWvssdrVill",
                    "createdDate": "2025-04-10T07:48:29.769Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "DataModel-Shopify-ProductVariant-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "DataModel-Shopify-ProductVariant-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "OFJSdteHWsq7",
                    "createdDate": "2025-04-10T07:48:29.769Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-barcode": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-ProductVariant-barcode",
                "name": "Barcode",
                "apiIdentifier": "barcode",
                "configuration": {
                    "type": "StringConfig",
                    "key": "1d2hSQa6iaHc",
                    "createdDate": "2025-04-10T07:48:29.770Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-compare_at_price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-ProductVariant-compare_at_price",
                "name": "Compare At Price",
                "apiIdentifier": "compareAtPrice",
                "configuration": {
                    "type": "StringConfig",
                    "key": "lEOK3bY56Bid",
                    "createdDate": "2025-04-10T07:48:29.770Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-inventory_policy": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-ProductVariant-inventory_policy",
                "name": "Inventory Policy",
                "apiIdentifier": "inventoryPolicy",
                "configuration": {
                    "type": "StringConfig",
                    "key": "SPZrwV3K1w7f",
                    "createdDate": "2025-04-10T07:48:29.770Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-inventory_quantity": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-ProductVariant-inventory_quantity",
                "name": "Inventory Quantity",
                "apiIdentifier": "inventoryQuantity",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "nVKSxehKayfu",
                    "createdDate": "2025-04-10T07:48:29.771Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-option1": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-ProductVariant-option1",
                "name": "Option 1",
                "apiIdentifier": "option1",
                "configuration": {
                    "type": "StringConfig",
                    "key": "YcHRbjsspDIq",
                    "createdDate": "2025-04-10T07:48:29.771Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-option2": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-ProductVariant-option2",
                "name": "Option 2",
                "apiIdentifier": "option2",
                "configuration": {
                    "type": "StringConfig",
                    "key": "07CzlCO4nVRl",
                    "createdDate": "2025-04-10T07:48:29.771Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-option3": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-ProductVariant-option3",
                "name": "Option 3",
                "apiIdentifier": "option3",
                "configuration": {
                    "type": "StringConfig",
                    "key": "pzJGrsmbp-Kw",
                    "createdDate": "2025-04-10T07:48:29.772Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-position": {
                "fieldType": "Number",
                "key": "ModelField-DataModel-Shopify-ProductVariant-position",
                "name": "Position",
                "apiIdentifier": "position",
                "configuration": {
                    "type": "NumberConfig",
                    "key": "VJQ730lb1NsA",
                    "createdDate": "2025-04-10T07:48:29.772Z",
                    "decimals": null,
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-price": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-ProductVariant-price",
                "name": "Price",
                "apiIdentifier": "price",
                "configuration": {
                    "type": "StringConfig",
                    "key": "JqaaloYrGl-a",
                    "createdDate": "2025-04-10T07:48:29.772Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-sku": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-ProductVariant-sku",
                "name": "SKU",
                "apiIdentifier": "sku",
                "configuration": {
                    "type": "StringConfig",
                    "key": "IVTidx-gCdbT",
                    "createdDate": "2025-04-10T07:48:29.773Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-taxable": {
                "fieldType": "Boolean",
                "key": "ModelField-DataModel-Shopify-ProductVariant-taxable",
                "name": "Taxable",
                "apiIdentifier": "taxable",
                "configuration": {
                    "type": "BooleanConfig",
                    "key": "pIW9E2ynnnIu",
                    "createdDate": "2025-04-10T07:48:29.773Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-DataModel-Shopify-ProductVariant-title": {
                "fieldType": "String",
                "key": "ModelField-DataModel-Shopify-ProductVariant-title",
                "name": "Title",
                "apiIdentifier": "title",
                "configuration": {
                    "type": "StringConfig",
                    "key": "RWOukdfF1-PW",
                    "createdDate": "2025-04-10T07:48:29.774Z",
                    "default": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-ProductVariant-Product": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-ProductVariant-Product",
                "name": "Product",
                "apiIdentifier": "product",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "Z38mBuo8mLZG",
                    "createdDate": "2025-04-10T07:48:29.770Z",
                    "relatedModelKey": "DataModel-Shopify-Product",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            },
            "ModelField-Shopify-ProductVariant-Shop": {
                "fieldType": "BelongsTo",
                "key": "ModelField-Shopify-ProductVariant-Shop",
                "name": "Shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "pnbmnr1HD4I6",
                    "createdDate": "2025-05-22T07:52:16.414Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": null
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "ShopifyProductVariant",
        "stateChart": {
            "type": "StateChart",
            "key": "k5PSFfvSLe1n",
            "createdDate": 1744271309738,
            "actions": {},
            "transitions": {},
            "stateInActionCode": true,
            "childStates": [
                {
                    "type": "State",
                    "key": "State-Shopify-ProductVariant-Start",
                    "createdDate": 1744271309739,
                    "name": "Start",
                    "isRecordBirthPlace": true,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-ProductVariant-Created",
                    "createdDate": 1744271309739,
                    "name": "Created",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": true,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                },
                {
                    "type": "State",
                    "key": "State-Shopify-ProductVariant-Deleted",
                    "createdDate": 1744271309740,
                    "name": "Deleted",
                    "isRecordBirthPlace": false,
                    "isUndeleteableSystemState": false,
                    "restoreHistory": true,
                    "childStates": [],
                    "customApiIdentifier": null
                }
            ],
            "initialChildState": "State-Shopify-ProductVariant-Start"
        }
    },
    "SenditConfig": {
        "key": "SenditConfigKey",
        "name": "senditConfig",
        "apiIdentifier": "senditConfig",
        "namespace": [],
        "fields": {
            "SenditConfigKey-system-id": {
                "fieldType": "ID",
                "key": "SenditConfigKey-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "5wy0lVg5qq3R",
                    "createdDate": "2025-04-15T20:08:35.988Z"
                },
                "internalWritable": true
            },
            "SenditConfigKey-system-createdAt": {
                "fieldType": "DateTime",
                "key": "SenditConfigKey-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "LeBEZUYw8jIC",
                    "createdDate": "2025-04-15T20:08:35.989Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "SenditConfigKey-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "SenditConfigKey-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "yDPDVOIEbZVK",
                    "createdDate": "2025-04-15T20:08:35.990Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "SenditAccType": {
                "fieldType": "String",
                "key": "SenditAccType",
                "name": "accountType",
                "apiIdentifier": "accountType",
                "configuration": {
                    "type": "StringConfig",
                    "key": "Br_D3iot22xa",
                    "createdDate": "2025-04-15T20:08:35.997Z",
                    "default": null
                },
                "internalWritable": true
            },
            "SenditLastAuth": {
                "fieldType": "DateTime",
                "key": "SenditLastAuth",
                "name": "lastAuthenticated",
                "apiIdentifier": "lastAuthenticated",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "rxujJ2rMP3as",
                    "createdDate": "2025-04-15T20:08:35.998Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "SenditName": {
                "fieldType": "String",
                "key": "SenditName",
                "name": "name",
                "apiIdentifier": "name",
                "configuration": {
                    "type": "StringConfig",
                    "key": "BkkTx_G-KnOA",
                    "createdDate": "2025-04-15T20:08:35.996Z",
                    "default": null
                },
                "internalWritable": true
            },
            "SenditPubKey": {
                "fieldType": "EncryptedString",
                "key": "SenditPubKey",
                "name": "publicKey",
                "apiIdentifier": "publicKey",
                "configuration": {
                    "type": "EncryptedStringConfig",
                    "key": "1NwaTD4dFNvn",
                    "createdDate": "2025-04-15T20:08:35.992Z"
                },
                "internalWritable": true
            },
            "SenditSecKey": {
                "fieldType": "EncryptedString",
                "key": "SenditSecKey",
                "name": "secretKey",
                "apiIdentifier": "secretKey",
                "configuration": {
                    "type": "EncryptedStringConfig",
                    "key": "LUnAzWZGGX0y",
                    "createdDate": "2025-04-15T20:08:35.993Z"
                },
                "internalWritable": true
            },
            "SenditShopRef": {
                "fieldType": "BelongsTo",
                "key": "SenditShopRef",
                "name": "shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "QYstm1k-iqCF",
                    "createdDate": "2025-04-15T20:08:36.000Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": "shopifyShop"
                },
                "internalWritable": true
            },
            "SenditToken": {
                "fieldType": "EncryptedString",
                "key": "SenditToken",
                "name": "token",
                "apiIdentifier": "token",
                "configuration": {
                    "type": "EncryptedStringConfig",
                    "key": "cYYHJLcJhQXu",
                    "createdDate": "2025-04-15T20:08:35.995Z"
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "SenditConfig",
        "stateChart": {
            "type": "StateChart",
            "key": "E8f_O8WXVaj8",
            "createdDate": 1744747715986,
            "actions": {},
            "transitions": {},
            "stateInActionCode": false,
            "childStates": []
        }
    },
    "SpeedafConfig": {
        "key": "SpeedafConfigKey",
        "name": "speedafConfig",
        "apiIdentifier": "speedafConfig",
        "namespace": [],
        "fields": {
            "SpeedafConfigKey-system-id": {
                "fieldType": "ID",
                "key": "SpeedafConfigKey-system-id",
                "name": "ID",
                "apiIdentifier": "id",
                "configuration": {
                    "type": "IDConfig",
                    "key": "FJGxcjcz7Aqr",
                    "createdDate": "2025-04-21T17:27:22.673Z"
                },
                "internalWritable": true
            },
            "SpeedafConfigKey-system-createdAt": {
                "fieldType": "DateTime",
                "key": "SpeedafConfigKey-system-createdAt",
                "name": "Created At",
                "apiIdentifier": "createdAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "TB4FnXPiGSoN",
                    "createdDate": "2025-04-21T17:27:22.675Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "SpeedafConfigKey-system-updatedAt": {
                "fieldType": "DateTime",
                "key": "SpeedafConfigKey-system-updatedAt",
                "name": "Updated At",
                "apiIdentifier": "updatedAt",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "PFnSgnjFOxf5",
                    "createdDate": "2025-04-21T17:27:22.676Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "SpeedafApiUrl": {
                "fieldType": "String",
                "key": "SpeedafApiUrl",
                "name": "apiEndpoint",
                "apiIdentifier": "apiEndpoint",
                "configuration": {
                    "type": "StringConfig",
                    "key": "fv115C6ug3t2",
                    "createdDate": "2025-04-21T17:27:22.684Z",
                    "default": null
                },
                "internalWritable": true
            },
            "SpeedafAppCode": {
                "fieldType": "String",
                "key": "SpeedafAppCode",
                "name": "appCode",
                "apiIdentifier": "appCode",
                "configuration": {
                    "type": "StringConfig",
                    "key": "_lnWlQ_XX_Sf",
                    "createdDate": "2025-04-21T18:04:27.646Z",
                    "default": null
                },
                "internalWritable": true
            },
            "SpeedafCustCode": {
                "fieldType": "String",
                "key": "SpeedafCustCode",
                "name": "customerCode",
                "apiIdentifier": "customerCode",
                "configuration": {
                    "type": "StringConfig",
                    "key": "fBfla8cv951O",
                    "createdDate": "2025-04-21T18:04:27.650Z",
                    "default": null
                },
                "internalWritable": true
            },
            "SpeedafLastAuth": {
                "fieldType": "DateTime",
                "key": "SpeedafLastAuth",
                "name": "lastAuthenticated",
                "apiIdentifier": "lastAuthenticated",
                "configuration": {
                    "type": "DateTimeConfig",
                    "key": "94POvxE1g_cz",
                    "createdDate": "2025-04-21T17:27:22.687Z",
                    "includeTime": true,
                    "default": null
                },
                "internalWritable": true
            },
            "SpeedafName": {
                "fieldType": "String",
                "key": "SpeedafName",
                "name": "name",
                "apiIdentifier": "name",
                "configuration": {
                    "type": "StringConfig",
                    "key": "B9TSxDpykPxz",
                    "createdDate": "2025-04-21T17:27:22.685Z",
                    "default": null
                },
                "internalWritable": true
            },
            "SpeedafPlatSrc": {
                "fieldType": "String",
                "key": "SpeedafPlatSrc",
                "name": "platformSource",
                "apiIdentifier": "platformSource",
                "configuration": {
                    "type": "StringConfig",
                    "key": "YB4_AMrDlu9i",
                    "createdDate": "2025-04-21T17:27:22.683Z",
                    "default": null
                },
                "internalWritable": true
            },
            "SpeedafSecKey": {
                "fieldType": "String",
                "key": "SpeedafSecKey",
                "name": "secretKey",
                "apiIdentifier": "secretKey",
                "configuration": {
                    "type": "StringConfig",
                    "key": "ywOMIeMsmZto",
                    "createdDate": "2025-04-21T18:04:27.653Z",
                    "default": null
                },
                "internalWritable": true
            },
            "SpeedafShopRef": {
                "fieldType": "BelongsTo",
                "key": "SpeedafShopRef",
                "name": "shop",
                "apiIdentifier": "shop",
                "configuration": {
                    "type": "BelongsToConfig",
                    "key": "n_B55SvYv2Wj",
                    "createdDate": "2025-04-21T17:27:22.689Z",
                    "relatedModelKey": "DataModel-Shopify-Shop",
                    "relatedModelApiIdentifier": "shopifyShop"
                },
                "internalWritable": true
            }
        },
        "graphqlTypeName": "SpeedafConfig",
        "stateChart": {
            "type": "StateChart",
            "key": "Z3GYCLiOQphQ",
            "createdDate": 1745256442671,
            "actions": {},
            "transitions": {},
            "stateInActionCode": false,
            "childStates": []
        }
    }
};
/**
 * Internal variable to map model apiIdentifier to GraphQL typename in modelsMap.
 * @internal
 */ const modelListIndex = {
    "api:shopifyCustomer": "ShopifyCustomer",
    "api:shopifyGdprRequest": "ShopifyGdprRequest",
    "api:shopifyOrder": "ShopifyOrder",
    "api:shopifyShop": "ShopifyShop",
    "api:shopifySync": "ShopifySync",
    "api:googleSheetConfig": "GoogleSheetConfig",
    "api:session": "Session",
    "api:shopifyFulfillment": "ShopifyFulfillment",
    "api:shopifyFulfillmentOrder": "ShopifyFulfillmentOrder",
    "api:shopifyFulfillmentService": "ShopifyFulfillmentService",
    "api:shopifyProduct": "ShopifyProduct",
    "api:shopifyProductVariant": "ShopifyProductVariant",
    "api:senditConfig": "SenditConfig",
    "api:speedafConfig": "SpeedafConfig"
};
