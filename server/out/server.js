"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_1 = require("vscode-languageserver/node");
//import vscode = require('vscode');
const aldenLanguage_json_1 = __importDefault(require("../src/aldenLanguage.json"));
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
// Create a connection for the server, using Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = (0, node_1.createConnection)(node_1.ProposedFeatures.all);
// Create a simple text document manager.
const documents = new node_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
let hasConfigurationCapability = false;
let hasWorkspaceFolderCapability = false;
let hasDiagnosticRelatedInformationCapability = false;
const keywords = aldenLanguage_json_1.default.keywords;
const builtIns = aldenLanguage_json_1.default.builtins;
const builtInModules = aldenLanguage_json_1.default.modules;
let knownSymbols = [];
connection.onInitialize((params) => {
    const capabilities = params.capabilities;
    // Does the client support the `workspace/configuration` request?
    // If not, we fall back using global settings.
    hasConfigurationCapability = !!(capabilities.workspace && !!capabilities.workspace.configuration);
    hasWorkspaceFolderCapability = !!(capabilities.workspace && !!capabilities.workspace.workspaceFolders);
    hasDiagnosticRelatedInformationCapability = !!(capabilities.textDocument &&
        capabilities.textDocument.publishDiagnostics &&
        capabilities.textDocument.publishDiagnostics.relatedInformation);
    const result = {
        capabilities: {
            textDocumentSync: node_1.TextDocumentSyncKind.Incremental,
            // Tell the client that this server supports code completion.
            completionProvider: {
                triggerCharacters: ['.']
            },
        }
    };
    if (hasWorkspaceFolderCapability) {
        result.capabilities.workspace = {
            workspaceFolders: {
                supported: true
            }
        };
    }
    return result;
});
connection.onInitialized(() => {
    if (hasConfigurationCapability) {
        // Register for all configuration changes.
        connection.client.register(node_1.DidChangeConfigurationNotification.type, undefined);
    }
    if (hasWorkspaceFolderCapability) {
        connection.workspace.onDidChangeWorkspaceFolders(_event => {
            connection.console.log('Workspace folder change event received.');
        });
    }
});
// The global settings, used when the `workspace/configuration` request is not supported by the client.
// Please note that this is not the case when using this server with the client provided in this example
// but could happen with other clients.
const defaultSettings = { maxNumberOfProblems: 1000 };
let globalSettings = defaultSettings;
// Cache the settings of all open documents
const documentSettings = new Map();
connection.onDidChangeConfiguration(change => {
    if (hasConfigurationCapability) {
        // Reset all cached document settings
        documentSettings.clear();
    }
    else {
        globalSettings = ((change.settings.aldenLanguageServer || defaultSettings));
    }
});
// Only keep settings for open documents
documents.onDidClose(e => {
    documentSettings.delete(e.document.uri);
});
// The content of a text document has changed. This event is emitted
// when the text document first opened or when its content has changed.
documents.onDidChangeContent(change => {
    const content = change.document.getText();
    const matches = content.matchAll(/(?<type>let|final|task|class|get|as|"")\s+(?<name>[a-zA-Z0-9_]+)\s*(?:|{)/g);
    const symbols = [];
    const foundSymbols = new Map();
    for (const match of matches) {
        const symbol = match.groups;
        if (symbol && !foundSymbols.has(symbol.name)) {
            let kind;
            switch (symbol.type) {
                case 'get': {
                    kind = node_1.CompletionItemKind.Module;
                    break;
                }
                case 'class': {
                    kind = node_1.CompletionItemKind.Class;
                    break;
                }
                case 'task': {
                    kind = node_1.CompletionItemKind.Function;
                    break;
                }
                case 'const': {
                    kind = node_1.CompletionItemKind.Constant;
                    break;
                }
                default: {
                    kind = node_1.CompletionItemKind.Variable;
                }
            }
            symbols.push({
                label: symbol.name,
                kind: kind,
            });
            foundSymbols.set(symbol.name, true);
        }
    }
    knownSymbols = symbols;
});
function getPreviousToken(srcline, end) {
    const re = new RegExp("[$_a-zA-Z][$_a-zA-Z0-9]*", 'g');
    let found;
    while ((found = re.exec(srcline)) != null) {
        const last = found.index + found[0].length;
        if (last == end) {
            return found[0];
        }
    }
    return "";
}
function findModuleMethods(name) {
    for (const module of builtInModules) {
        if (module.name == name) {
            return module.methods || [];
        }
    }
    return [];
}
function findModulewithVariables(name) {
    for (const module of builtInModules) {
        if (module.name == name) {
            return module.variables || [];
        }
    }
    return [];
}
function aldenDocumentationMarkdown(documentation) {
    return {
        kind: node_1.MarkupKind.Markdown,
        value: [
            "```alden",
            documentation,
            "```"
        ].join('\n\n')
    };
}
// This handler provides the initial list of the completion items.
connection.onCompletion((document) => {
    var _a, _b;
    const content = (_a = documents.get(document.textDocument.uri)) === null || _a === void 0 ? void 0 : _a.getText().split("\n")[document.position.line];
    const position = document.position.character - 1;
    if (content === undefined) {
        return [];
    }
    switch ((_b = document.context) === null || _b === void 0 ? void 0 : _b.triggerCharacter) {
        case ".": {
            const previousToken = getPreviousToken(content, position);
            const builtInMethods = findModuleMethods(previousToken);
            const builtInModuleswithVariables = findModulewithVariables(previousToken);
            if (builtInMethods) {
                return builtInMethods.map((method) => ({
                    label: method.name,
                    kind: node_1.CompletionItemKind.Method,
                    data: method.name,
                    detail: method.detail,
                    documentation: aldenDocumentationMarkdown(method.documentation),
                }));
            }
            if (builtInModuleswithVariables) {
                return builtInModuleswithVariables.map((variable) => ({
                    label: variable.name,
                    kind: node_1.CompletionItemKind.Variable,
                    data: variable.name,
                    detail: variable.detail,
                    documentation: aldenDocumentationMarkdown(variable.documentation),
                }));
            }
            return [];
        }
        default: {
            // if (content.slice(position - 7, position - 1) === "get") {
            // 	const modules: CompletionItem[] = [];
            // 	for (const module of builtInModules) {
            // 		modules.push({
            // 			label: module.name,
            // 			kind: CompletionItemKind.Module,
            // 			detail: module.detail,
            // 			documentation: aldenDocumentationMarkdown(module.documentation)
            // 		});
            // 	}
            // 	return modules;
            // }
            const defaultCompletion = [];
            for (const keyword of keywords) {
                defaultCompletion.push({
                    label: keyword,
                    kind: node_1.CompletionItemKind.Keyword
                });
            }
            for (const builtIn of builtIns) {
                defaultCompletion.push({
                    label: builtIn.name,
                    kind: node_1.CompletionItemKind.Function,
                    detail: builtIn.detail,
                    documentation: aldenDocumentationMarkdown(builtIn.documentation)
                });
            }
            if (knownSymbols !== []) {
                defaultCompletion.push(...knownSymbols);
            }
            return defaultCompletion;
        }
    }
});
// error handling
async function validateTextDocument(textDocument) {
    const diagnostics = [];
    const content = textDocument.getText();
    // detect illegal characters in the document e.g semicolons
    const illegalCharacters = /[;~]/g;
    const illegalCharacterMatch = content.match(illegalCharacters);
    if (illegalCharacterMatch) {
        for (const illegalCharacter of illegalCharacterMatch) {
            // get=the line where all the illegal characters are
            const illegalCharacterLine = content.split("\n").findIndex((line) => line.includes(illegalCharacter));
            const diagnostic = {
                severity: node_1.DiagnosticSeverity.Error,
                range: {
                    start: {
                        line: illegalCharacterLine,
                        character: content.split("\n")[illegalCharacterLine].indexOf(illegalCharacter)
                    },
                    end: {
                        line: illegalCharacterLine,
                        character: content.split("\n")[illegalCharacterLine].indexOf(illegalCharacter) + 1
                    }
                },
                message: `Statements must be separated by a newline`,
                source: 'alden'
            };
            if (hasDiagnosticRelatedInformationCapability) {
                diagnostic.relatedInformation = [
                    {
                        location: {
                            uri: textDocument.uri,
                            range: {
                                start: {
                                    line: illegalCharacterLine,
                                    character: content.split("\n")[illegalCharacterLine].indexOf(illegalCharacter)
                                },
                                end: {
                                    line: illegalCharacterLine,
                                    character: content.split("\n")[illegalCharacterLine].indexOf(illegalCharacter) + 1
                                }
                            }
                        },
                        message: `'${illegalCharacter}' is not allowed`
                    }
                ];
            }
            diagnostics.push(diagnostic);
        }
        connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
    }
    else {
        connection.sendDiagnostics({ uri: textDocument.uri, diagnostics });
    }
}
documents.onDidChangeContent((change) => {
    validateTextDocument(change.document);
});
// Make the text document manager listen on the connection
// for open, change and close text document events
documents.listen(connection);
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map