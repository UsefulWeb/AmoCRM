"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasSave = void 0;
function hasSave(Base) {
    return class HasSave extends Base {
        save(options) {
            if (this.isNew()) {
                return this.create(options);
            }
            return this.update(options);
        }
    };
}
exports.hasSave = hasSave;
//# sourceMappingURL=hasSave.js.map