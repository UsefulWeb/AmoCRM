import Connection from "../src/common/Connection";
import Client from "../src/Client";
import config from "./config";

let client: Client;

beforeEach(() => {
    client = new Client(config);
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