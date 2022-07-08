"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.canGetById = void 0;
const tslib_1 = require("tslib");
function canGetById(factory) {
    return function getById(identity, criteria, options) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const url = factory.getUrl('/' + identity);
            const { data } = yield factory.getRequest().get(url, criteria, options);
            if (!data) {
                return null;
            }
            const instance = factory.createEntity();
            instance.setAttributes(data);
            factory.emit('getById');
            return instance;
        });
    };
}
exports.canGetById = canGetById;
//# sourceMappingURL=canGetById.js.map