export default {
    apiUrl: '/api/v4/',
    auth: {
        token: '/oauth2/access_token'
    },
    entities: {
        leads: {
            path: '/api/v4/leads'
        },
        contacts: {
            path: '/api/v4/contacts'
        },
        companies: {
            path: '/api/v4/companies'
        }
    }
};
