export const CODE = '';
export const LTS_TOKEN = '';

const config = {
    domain: 'test',
    auth: {
        client_id: 'clientId',
        client_secret: 'clientSecret',
        redirect_uri: 'redirectUri'
    },
}

export const ltsConfig = {
    ...config,
    auth: {
        ...config.auth,
        bearer: LTS_TOKEN
    }
}
export default config;