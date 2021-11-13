"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const extensionProvider = vscode;
const client = (text) => {
    return {
        message: () => {
            return new extensionProvider.Hover(text);
        }
    };
};
const message = (text) => {
    return client(text).message();
};
exports.default = message;
//# sourceMappingURL=message.js.map