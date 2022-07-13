import { Client } from "../dist";
import path from "path";
import fs from "fs";
import { IClientOptions } from "../dist/interfaces/common";

export function connect(config: IClientOptions) {
    const client = new Client(config);
    const file = path.resolve(__dirname, './token.json');

    if (!config.auth.code) {
        const json = fs.readFileSync(file).toString();
        const data = JSON.parse(json);
        client.token.setValue(data);
    }

    client.token.on('change', () => {
        const token = client.token.getValue();
        const data = JSON.stringify(token);
        fs.writeFileSync(file, data);
    });
    return client;
}