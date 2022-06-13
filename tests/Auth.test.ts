import ngrok from 'ngrok';
import "./bootstrap";
import config from "./config";
import { Client } from "../src/Client";
import Connection from "../src/common/Connection";

let client: Client;

// beforeAll(async () => {
//     console.log('connecting to ngrok');
//     url = await ngrok.connect({
//         addr: localPort
//     });
//     config.auth.redirect_uri = url;
//     console.info('ngrok url: '+ url);
// });
//
// afterAll(async () => {
//     await ngrok.kill();
// });

beforeEach(() => {
    client = new Client(config);
});

describe('auth', () => {
    test('get url', async () => {
        const url = client.auth.getUrl();
        const { client_id } = config.auth;
        const baseUrl = 'https://www.amocrm.ru/oauth';
        const expectedUrl = `${baseUrl}?client_id=${client_id}&mode=popup`;
        expect(url).toBe(expectedUrl);
    });

    test('test beforeConnect event', async () => {
        const url = client.auth.getUrl();

        console.log('client auth url: ' + url);
        const args: any[] = await new Promise(resolve => {
            client.on('connection:beforeConnect',
                (...args: any[]) => resolve(args)
            );
            client.connection.connect();
        });
        const connection: Connection = args[0];
        expect(connection).toBeInstanceOf(Connection);
    });
});
