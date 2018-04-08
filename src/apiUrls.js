export default {
  auth: '/private/api/auth.php?type=json',
  account: '/api/v2/account',
  multiactions: '/ajax/v1/multiactions/set',
  entities: {
    leads: {
      path: '/api/v2/leads',
      deleteOnePath: '/private/deals/delete.php',
    },
    contacts: {
      path: '/api/v2/contacts'
    },
    companies: {
      path: '/api/v2/companies'
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
      getPath: '/api/v2/pipelines',
      insertPath: '/private/api/v2/json/pipelines/set',
      updatePath: '/private/api/v2/json/pipelines/set',
      deletePath: '/private/api/v2/json/pipelines/delete'
    }
  },
  unsorted: {
    get: '/api/v2/incoming_leads',
    summary: '/api/v2/incoming_leads/summary',
    add: '/api/v2/incoming_leads/sip',
    addFromForm: '/api/v2/incoming_leads/form',
    accept: '/api/v2/incoming_leads/accept',
    decline: '/api/v2/incoming_leads/decline'
  }
};
