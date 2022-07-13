const fs = require('fs');
const path = require('path');
// экземпляр Client
const { client } = require('../client');

const run = async () => {
    const filePath = path.resolve(__dirname, '../token.json');

    client.connection.on('change', () => {
        const token = client.token.getValue();
        fs.writeFileSync(filePath, JSON.stringify(token));
    });
    try {
        const json = fs.readFileSync(filePath).toString();
        const currentToken = JSON.parse(json);
        client.token.setValue(currentToken);
    } catch (e) {
        // Файл не найден, некорректный JSON-токен
    }
}
