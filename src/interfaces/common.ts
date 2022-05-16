export interface TokenOptions {
    client_id: string,
    client_secret: string,
    redirect_uri: string,
    code?: string,
}

export interface AuthOptions extends TokenOptions {
    server?: {
        port?: number
    }
}

export interface EventEmittersOptions {
    captureRejections?: boolean | undefined;
}

export interface ClientOptions extends EventEmittersOptions {
    domain: string,
    auth: AuthOptions
}

export interface ConnectionOptions {
    domain: string,
    auth: AuthOptions
}