"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const modules = [
    // System
    {
        name: 'System',
        description: 'This module contains methods for system operations.',
        detail: '(module) System',
        symbolKind: 'class',
    },
    {
        name: 'stdin',
        description: '',
        detail: '(variable) stdin',
        symbolKind: 'variable'
    },
    {
        name: 'stdout',
        description: '',
        detail: '(variable) stdout',
        symbolKind: 'variable'
    },
    {
        name: 'stderr',
        description: '',
        detail: '(variable) stderr',
        symbolKind: 'variable'
    },
    {
        name: 'exit',
        description: 'This task terminates the current process.',
        detail: 'System.exit(code)',
        symbolKind: 'task'
    },
    {
        name: 'read',
        description: 'Reads a line from the standard input stream.',
        detail: 'System.stdin.read() -> string',
        symbolKind: 'task'
    },
    {
        name: 'write',
        description: 'Writes a string to the standard output stream.',
        detail: 'System.stdout.write(string)',
        symbolKind: 'task'
    },
    // Process
    {
        name: 'Process',
        description: 'This module contains methods for process operations.',
        detail: '(module) Process',
        symbolKind: 'class'
    },
    {
        name: "exec",
        description: "Executes a given command and returns the result object. Waits for the command to finish before returning.",
        detail: "Process.exec(['ls', '-l'])",
        symbolKind: 'task'
    },
    {
        name: "run",
        description: "Executes a given command and returns the result object. Does not wait for the command to finish before returning.",
        detail: "Process.run(['ls', '-l'])",
        symbolKind: 'task'
    },
    // Date
    {
        name: 'Date',
        description: 'This module contains methods for date operations.',
        detail: '(module) Date',
        symbolKind: 'class'
    },
    {
        name: "new",
        description: "Creates a new Date object.",
        detail: "Date.new(year, month, day, hour, minute, second, millisecond) -> Date",
        symbolKind: 'task'
    },
    {
        name: "now",
        description: "Returns the current date and time in a human readable format.",
        detail: "Date.now() // Mon Jan 01 2001 00:00:00 2000",
        symbolKind: 'task'
    },
    {
        name: "nowUTC",
        description: "Returns a string representing the current date and time in UTC.",
        detail: "Datetime.nowUTC() // Fri May 29 02:12:32 2020",
        symbolKind: 'task'
    },
    {
        name: "parse",
        description: "Parses a string representation of a date and time.",
        detail: "Date.parse(string) -> Number",
        symbolKind: 'task'
    },
    {
        name: "getDay",
        description: "Returns the day of the week of a date.",
        detail: "Date.getDay() // 0 (Sunday) to 6 (Saturday)",
        symbolKind: 'task'
    },
    {
        name: "getFullYear",
        description: "Returns the year of a date.",
        detail: "Date.getFullYear() // 2020",
        symbolKind: 'task'
    },
    {
        name: "getHours",
        description: "Returns the hour of a date.",
        detail: "Date.getHours() // 0 to 23",
        symbolKind: 'task'
    },
    {
        name: "getSeconds",
        description: "Returns the seconds of a date.",
        detail: "Date.getSeconds() // 0 to 59",
        symbolKind: 'task'
    },
    {
        name: "getMilliseconds",
        description: "Returns the milliseconds of a date.",
        detail: "Date.getMilliseconds() // 0 to 999",
        symbolKind: 'task'
    },
    {
        name: "getMinutes",
        description: "Returns the minutes of a date.",
        detail: "Date.getMinutes() // 0 to 59",
        symbolKind: 'task'
    },
    {
        name: "getMonth",
        description: "Returns the month of a date.",
        detail: "Date.getMonth() // 0 to 11",
        symbolKind: 'task'
    },
    {
        name: "getTime",
        description: "Returns number of milliseconds since a date.",
        detail: "Date.getTime() // 1589788400000",
        symbolKind: 'task'
    },
    // Path
    {
        name: 'Path',
        description: 'This module contains methods for path operations.',
        detail: '(module) Path',
        symbolKind: 'class'
    },
    {
        name: "basename",
        description: "Returns the basename of the path.",
        detail: "Path.basename('/usr/bin')",
        symbolKind: 'task'
    },
    {
        name: "dirname",
        description: "Returns the directory name of the path.",
        detail: "Path.dirname('/usr/bin')",
        symbolKind: 'task'
    },
    {
        name: "extname",
        description: "Returns the extension of the path.",
        detail: "Path.extname('/src/main.txt')",
        symbolKind: 'task'
    },
    {
        name: "isAbsolute",
        description: "Returns true if the path is absolute.",
        detail: "Path.isAbsolute('/usr')",
        symbolKind: 'task'
    },
    // Env
    {
        name: 'Env',
        description: 'This module contains methods for environment operations.',
        detail: '(module) Env',
        symbolKind: 'class'
    },
    {
        name: "get",
        description: "Returns the value of an environment variable.",
        detail: "Env.get('URL')",
        symbolKind: 'task'
    },
    {
        name: "set",
        description: "Chanages or adds an environment variable. When setting a variable, the value must be a string. Returns a boolean indicating whether the operation was successful.",
        detail: "Env.set('key', 'test')",
        symbolKind: 'task'
    },
    {
        name: "delete",
        description: "Deletes an environment variable. Returns a boolean indicating whether the operation was successful.",
        detail: "Env.delete('key')",
        symbolKind: 'task'
    },
    {
        name: "getAll",
        description: "Returns an object containing all environment variables.",
        detail: "Env.getAll()",
        symbolKind: 'task'
    },
    // File
    {
        name: 'File',
        description: 'This module contains methods for file operations.',
        detail: '(module) File',
        symbolKind: 'class'
    },
    {
        name: "exists",
        description: "Returns true if the file exists.",
        detail: "File.exists('/usr/bin/ls')",
        symbolKind: 'task'
    },
    {
        name: "read",
        description: "Reads the contents of a file.",
        detail: "File.read('/usr/bin/ls')",
        symbolKind: 'task'
    },
    {
        name: "write",
        description: "Writes the contents of a file.",
        detail: "File.write('/usr/bin/ls', 'Hello World!')",
        symbolKind: 'task'
    },
    {
        name: "close",
        description: "Closes a file.",
        detail: "File.close('/usr/bin/ls')",
        symbolKind: 'task'
    },
    // Http 
    {
        name: 'Http',
        description: 'This module contains methods for working with HTTP.',
        detail: '(module) Http',
        symbolKind: 'class'
    },
    {
        name: "get",
        description: "Sends a HTTP GET request to a given URL. Returns a result object.",
        detail: "HTTP.get('https://www.url.com')",
        symbolKind: 'task'
    },
    {
        name: "post",
        description: "Sends a HTTP POST request to a given URL. Returns a result object upon success.",
        detail: "HTTP.post('https://www.url.com', object)",
        symbolKind: 'task'
    },
    // Base64
    {
        name: 'Base64',
        description: 'This module contains methods for working with Base64.',
        detail: '(module) Base64',
        symbolKind: 'class'
    },
    {
        name: "encode",
        description: "Base64 encode a given string.",
        detail: "Base64.encode('This is a test')",
        symbolKind: 'task'
    },
    {
        name: "decode",
        description: "Base64 decode a given string.",
        detail: "Base64.decode('VGhpcyBpcyBhIHRlc3Q=')",
        symbolKind: 'task'
    },
    // Hashlib
    {
        name: 'Hashlib',
        description: 'Module containing methods for working with different hash algorithms.',
        detail: '(module) Hashlib',
        symbolKind: 'task'
    },
    {
        name: "sha256",
        description: "Hashes a given string using the SHA-256 algorithm.",
        detail: "Hashlib.sha256('This is a test')",
        symbolKind: 'task'
    },
    {
        name: "hmac",
        description: "Generates a HMAC using the SHA-256 algorithm.",
        detail: "Hashlib.hmac('secret', 'This is a test')",
        symbolKind: 'task'
    },
    {
        name: "bcrypt",
        description: "Generates a bcrypt hash.",
        detail: "Hashlib.bcrypt( 'This is a test' )",
        symbolKind: 'task'
    },
    // Math
    {
        name: 'Math',
        description: 'This module contains methods for mathematical operations.',
        detail: '(module) Math',
        symbolKind: 'class'
    },
    {
        name: "abs",
        description: "Returns the absolute value of a number.",
        detail: "Math.abs(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "acos",
        description: "Returns the arccosine of a number.",
        detail: "Math.acos(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "asin",
        description: "Returns the arcsine of a number.",
        detail: "Math.asin(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "atan",
        description: "Returns the arctangent of a number.",
        detail: "Math.atan(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "atan2",
        description: "Returns the arctangent of the quotient of its arguments.",
        detail: "Math.atan2(y, x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "ceil",
        description: "Returns the smallest integer greater than or equal to a number.",
        detail: "Math.ceil(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "cos",
        description: "Returns the cosine of a number.",
        detail: "Math.cos(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "exp",
        description: "Returns the value of E raised to the power of a number.",
        detail: "Math.exp(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "floor",
        description: "Returns the largest integer less than or equal to a number.",
        detail: "Math.floor(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "log",
        description: "Returns the natural logarithm (base e) of a number.",
        detail: "Math.log(x, base) -> Number // base defaults to e",
        symbolKind: 'task'
    },
    {
        name: "max",
        description: "Returns the largest of zero or more numbers.",
        detail: "Math.max(value1, value2, ...) -> Number",
        symbolKind: 'task'
    },
    {
        name: "min",
        description: "Returns the smallest of zero or more numbers.",
        detail: "Math.min(value1, value2, ...) -> Number",
        symbolKind: 'task'
    },
    {
        name: "pow",
        description: "Returns base to the exponent power, that is, baseexponent.",
        detail: "Math.pow(x, y) -> Number",
        symbolKind: 'task'
    },
    {
        name: "random",
        description: "Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive).",
        detail: "Math.random() -> Number",
        symbolKind: 'task'
    },
    {
        name: "round",
        description: "Returns the value of a number rounded to the nearest integer.",
        detail: "Math.round(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "sin",
        description: "Returns the sine of a number.",
        detail: "Math.sin(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "sqrt",
        description: "Returns the square root of a number.",
        detail: "Math.sqrt(x) -> Number",
        symbolKind: 'task'
    },
    {
        name: "tan",
        description: "Returns the tangent of a number.",
        detail: "Math.tan(x) -> Number",
        symbolKind: 'task'
    },
];
const getModule = (name) => {
    return modules.find(m => m.name === name);
};
const getModules = () => {
    return modules;
};
const builtins = [
    {
        name: "print",
        description: "Prints a value to stdout.",
        detail: "(task)\nprint(values)",
        symbolKind: 'task'
    },
    {
        name: "println",
        description: "Prints a value to stdout with a newline.",
        detail: "println(values)",
        symbolKind: 'task'
    },
    {
        name: "exit",
        description: "Exits the program.",
        detail: "exit()",
        symbolKind: 'task'
    },
    {
        name: "clear",
        description: "Clears the screen.",
        detail: "clear()",
        symbolKind: 'task'
    },
    {
        name: "delay",
        description: "Delay the program for a given amount of milliseconds.",
        detail: "delay(1000) // 1 second",
        symbolKind: 'task'
    },
    {
        name: "input",
        description: "Retrieves input from stdin and returns value as a string",
        detail: "input(\"Enter your name: \") // Optional prompt",
        symbolKind: 'task'
    },
    {
        name: "typeof",
        description: "Returns the type of a given value as a string.",
        detail: "typeof(10) -> \"int\"\ntypeof(\"test\") -> \"string\"\ntypeof(true) -> \"bool\"\ntypeof(none) -> \"none\"",
        symbolKind: 'task'
    },
    {
        name: "assert",
        description: "Raise a runtime error if the given expression is not true.",
        detail: "assert(10 > 5)",
        symbolKind: 'task'
    },
    {
        name: "isDefined",
        description: "Returns a boolean value indicating whether the given value is defined or not.",
        detail: "isDefined('test') -> true\nisDefined(none) -> false",
        symbolKind: 'task'
    }
];
const getBuiltIn = (name) => {
    return builtins.find(b => b.name === name);
};
const getBuiltIns = () => {
    return builtins;
};
exports.default = {
    getModule,
    getModules,
    getBuiltIn,
    getBuiltIns
};
//# sourceMappingURL=language.js.map