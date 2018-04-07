export default {
  auth: '/private/api/auth.php?type=json',
  entities: {
    leads: '/api/v2/leads',
    contacts: '/api/v2/contacts',
    companies: '/api/v2/companies',
    customers: '/api/v2/customers',
    tasks: '/api/v2/tasks',
    notes: '/api/v2/notes',
    fields: '/api/v2/fields',
    pipelines: {
      get: '/api/v2/pipelines',
      update: '/private/api/v2/json/pipelines/set',
      delete: '/private/api/v2/json/pipelines/delete'
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
