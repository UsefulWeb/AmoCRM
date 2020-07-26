export default {
  auth: '/private/api2/auth.php?type=json',
  account: '/api2/v2/account',
  multiactions: '/ajax/v1/multiactions/set',
  entities: {
    leads: {
      path: '/api2/v2/leads',
      deleteOnePath: '/private/deals/delete.php'
    },
    contacts: {
      path: '/api2/v2/contacts',
      filter: '/ajax/contacts/list/'
    },
    companies: {
      path: '/api2/v2/companies'
    },
    catalogs: {
      path: '/api2/v2/catalogs'
    },
    catalogElements: {
      path: '/api2/v2/catalog_elements'
    },
    customers: {
      path: '/api2/v2/customers'
    },
    tasks: {
      path: '/api2/v2/tasks'
    },
    notes: {
      path: '/api2/v2/notes'
    },
    fields: {
      path: '/api2/v2/fields'
    },
    pipelines: {
      path: '/private/api2/v2/json/pipelines/set',
      getPath: '/api2/v2/pipelines',
      deletePath: '/private/api2/v2/json/pipelines/delete'
    }
  },
  unsorted: {
    get: '/api2/v2/incoming_leads',
    summary: '/api2/v2/incoming_leads/summary',
    addFromSIP: '/api2/v2/incoming_leads/sip',
    addFromForm: '/api2/v2/incoming_leads/form',
    accept: '/api2/v2/incoming_leads/accept',
    decline: '/api2/v2/incoming_leads/decline'
  }
};
