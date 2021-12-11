"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
const setHover = ({ name, description, detail }) => {
    const markdown = new vscode_1.MarkdownString();
    const code = detail;
    markdown.appendCodeblock(code, 'alden');
    markdown.appendMarkdown("---\n");
    markdown.appendText(description);
    markdown.isTrusted = true;
    const hover = new vscode_1.Hover(markdown);
    return hover;
};
exports.default = setHover;
//# sourceMappingURL=index.js.map