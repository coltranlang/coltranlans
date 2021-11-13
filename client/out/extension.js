"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode = require("vscode");
const vscode_1 = require("vscode");
const fileLanguage_1 = require("./helpers/fileLanguage");
const node_1 = require("vscode-languageclient/node");
let client;
function activate(context) {
    // The server is implemented in node
    const serverModule = context.asAbsolutePath(path.join('server', 'out', 'server.js'));
    // The debug options for the server
    // --inspect=6009: runs the server in Node's Inspector mode so VS Code can attach to the server for debugging
    const debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] };
    // If the extension is launched in debug mode then the debug server options are used
    // Otherwise the run options are used
    const serverOptions = {
        run: { module: serverModule, transport: node_1.TransportKind.ipc },
        debug: {
            module: serverModule,
            transport: node_1.TransportKind.ipc,
            options: debugOptions
        }
    };
    // Options to control the language client
    const clientOptions = {
        // Register the server for .pear files
        documentSelector: [{ scheme: 'file', language: 'alden' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    // Create the language client and start the client.
    client = new node_1.LanguageClient('languageServerExample', 'Language Server Example', serverOptions, clientOptions);
    // const HoverProvider = () => {
    // 	return {
    // 	};
    // };
    // const CompletionItemProvider = () => {	
    // };
    // hover and completion
    //vscode.languages.registerHoverProvider(fileLanguage, HoverProvider());
    const tokenTypes = ['variable', 'function', 'get'];
    const tokenType = tokenTypes[Math.floor(Math.random() * tokenTypes.length)];
    const tokenModifiers = ['public', 'private', 'protected'];
    const legend = new vscode.SemanticTokensLegend(tokenTypes, tokenModifiers);
    const tokenProvider = () => {
        return {
            provideDocumentSemanticTokens(document, token) {
                const tokensBuilder = new vscode.SemanticTokensBuilder(legend);
                tokensBuilder.push(new vscode.Range(new vscode.Position(1, 1), new vscode.Position(1, 5)), 'get', ['public']);
                return tokensBuilder.build();
            }
        };
    };
    vscode.languages.registerDocumentSemanticTokensProvider(fileLanguage_1.default, tokenProvider(), legend);
    client.start();
}
exports.activate = activate;
function deactivate() {
    if (!client) {
        return undefined;
    }
    return client.stop();
}
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map