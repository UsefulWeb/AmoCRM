'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  auth: '/private/api/auth.php?type=json',
  account: '/api/v2/account',
  multiactions: '/ajax/v1/multiactions/set',
  entities: {
    leads: {
      path: '/api/v2/leads',
      deleteOnePath: '/private/deals/delete.php'
    },
    contacts: {
      path: '/api/v2/contacts'
    },
    companies: {
      path: '/api/v2/companies'
    },
    catalogs: {
      path: '/api/v2/catalogs'
    },
    catalogElements: {
      path: '/api/v2/catalog_elements'
    },
    customers: {
      path: '/api/v2/customers'
    },
    tasks: {
      path: '/api/v2/tasks'
    },
    notes: {
      path: '/api/v2/notes'
    },
    fields: {
      path: '/api/v2/fields'
    },
    pipelines: {
      path: '/private/api/v2/json/pipelines/set',
      getPath: '/api/v2/pipelines',
      deletePath: '/private/api/v2/json/pipelines/delete'
    }
  },
  unsorted: {
    get: '/api/v2/incoming_leads',
    summary: '/api/v2/incoming_leads/summary',
    addFromSIP: '/api/v2/incoming_leads/sip',
    addFromForm: '/api/v2/incoming_leads/form',
    accept: '/api/v2/incoming_leads/accept',
    decline: '/api/v2/incoming_leads/decline'
  }
};