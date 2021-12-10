"use strict";
/* --------------------------------------------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 * ------------------------------------------------------------------------------------------ */
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const path = require("path");
const vscode_1 = require("vscode");
const vscode = require("vscode");
const node_1 = require("vscode-languageclient/node");
let client;
const language_1 = require("./language");
const hover_1 = require("./hover");
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
        // Register the server for Alden documents
        documentSelector: [{ scheme: 'file', language: 'alden' }],
        synchronize: {
            // Notify the server about file changes to '.clientrc files contained in the workspace
            fileEvents: vscode_1.workspace.createFileSystemWatcher('**/.clientrc')
        }
    };
    // Create the language client and start the client.
    client = new node_1.LanguageClient('aldenLanguageServer', 'Alden Language Server', serverOptions, clientOptions);
    // Hover
    vscode.languages.registerHoverProvider('alden', {
        provideHover(document, position, token) {
            const getPosition = document.getText(document.getWordRangeAtPosition(position));
            // remove a comment if it exists and return the content
            const commentIndex = getPosition.indexOf('#');
            const name = commentIndex > -1 ? getPosition.substring(0, commentIndex) : getPosition;
            const module = language_1.default.getModule(name);
            const builtIn = language_1.default.getBuiltIn(name);
            if (module) {
                return (0, hover_1.default)(module);
            }
            if (builtIn) {
                return (0, hover_1.default)(builtIn);
            }
            return null;
        }
    });
    const getSymbolKind = (kind) => {
        let symbolKind;
        switch (kind) {
            case 'class':
                symbolKind = vscode.SymbolKind.Class;
                break;
            case 'task':
                symbolKind = vscode.SymbolKind.Function;
                break;
            case 'variable':
                symbolKind = vscode.SymbolKind.Variable;
                break;
            case 'constant':
                symbolKind = vscode.SymbolKind.Constant;
                break;
            default:
                symbolKind = vscode.SymbolKind.Class;
        }
        return symbolKind;
    };
    const getComplentionKind = (kind) => {
        let completionKind;
        switch (kind) {
            case 'class':
                completionKind = vscode.CompletionItemKind.Class;
                break;
            case 'task':
                completionKind = vscode.CompletionItemKind.Function;
                break;
            case 'variable':
                completionKind = vscode.CompletionItemKind.Variable;
                break;
            case 'constant':
                completionKind = vscode.CompletionItemKind.Constant;
                break;
            default:
                completionKind = vscode.CompletionItemKind.Class;
        }
        return completionKind;
    };
    // Symbol
    vscode.languages.registerDocumentSymbolProvider('alden', {
        provideDocumentSymbols(document, token) {
            const symbols = [];
            const modules = language_1.default.getModules();
            const line = document.lineAt(0);
            const start = line.range.start;
            const end = line.range.end;
            for (const module of modules) {
                const symbol = new vscode.DocumentSymbol(module.name, module.description, getSymbolKind(module.symbolKind), new vscode.Range(new vscode.Position(start.line, start.character), new vscode.Position(end.line, end.character)), new vscode.Range(new vscode.Position(start.line, start.character), new vscode.Position(end.line, end.character)));
                symbols.push(symbol);
            }
            return symbols;
        }
    });
    // Go to definition
    vscode.languages.registerDefinitionProvider('alden', {
        provideDefinition(document, position, token) {
            const getPosition = document.getText(document.getWordRangeAtPosition(position));
            // remove a comment if it exists and return the content
            const commentIndex = getPosition.indexOf('#');
            const name = commentIndex > -1 ? getPosition.substring(0, commentIndex) : getPosition;
            const module = language_1.default.getModule(name);
            const line = document.lineAt(0);
            const start = line.range.start;
            const end = line.range.end;
            // This is for testing purposes only
            const file = vscode.Uri.file(`${process.env.USERPROFILE}\\.vscode\\extensions\\alden.alden-${vscode.extensions.getExtension('alden.alden').packageJSON.version}\\src\\stubs\\${module.name}.aldeni`);
            if (module) {
                return [
                    new vscode.Location(file, new vscode.Range(new vscode.Position(start.line, start.character), new vscode.Position(end.line, end.character)))
                ];
            }
            return null;
        }
    });
    // Code completion
    vscode.languages.registerCompletionItemProvider('alden', {
        provideCompletionItems(document, position, token) {
            const getPosition = document.getText(document.getWordRangeAtPosition(position));
            // remove a comment if it exists and return the content
            const commentIndex = getPosition.indexOf('#');
            const name = commentIndex > -1 ? getPosition.substring(0, commentIndex) : getPosition;
            const module = language_1.default.getModule(name);
            const builtIn = language_1.default.getBuiltIn(name);
            if (module) {
                const symbolKind = getComplentionKind(module.symbolKind);
                const completionItem = new vscode.CompletionItem(module.name, symbolKind);
                completionItem.documentation = module.description;
                return [completionItem];
            }
            if (builtIn) {
                const symbolKind = getComplentionKind(builtIn.symbolKind);
                const completionItem = new vscode.CompletionItem(builtIn.name, symbolKind);
                completionItem.documentation = builtIn.description;
                return [completionItem];
            }
            return null;
        }
    });
    // Diagnostic
    // vscode.workspace.onDidChangeTextDocument((e) => {
    // 	if (e.document.languageId === 'alden') {
    // 		const tokens = e.document.getText();
    // 		//
    // 	}
    // });
    // Start the client. This will also launch the server
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