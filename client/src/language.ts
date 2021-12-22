

interface Modules {
	name: string;
	description: string;
	detail: string;
	symbolKind: string;
	filePath?: string;
}

interface BuiltIns_functions {
	name: string;
	description: string;
	detail: string;
	symbolKind: string;
	filePath?: string;
}

const modules: Modules[] = [
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
		description: 'This def terminates the current process.',
		detail: 'System.exit(code)',
		symbolKind: 'function'
	},
	{
		name: 'read',
		description: 'Reads a line from the standard input stream.',
		detail: 'System.stdin.read() -> string',
		symbolKind: 'function'
	},
	{
		name: 'write',
		description: 'Writes a string to the standard output stream.',
		detail: 'System.stdout.write(string)',
		symbolKind: 'function'
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
		symbolKind: 'function'
	},
	{
		name: "run",
		description: "Executes a given command and returns the result object. Does not wait for the command to finish before returning.",
		detail: "Process.run(['ls', '-l'])",
		symbolKind: 'function'
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
		symbolKind: 'function'
	},
	{
		name: "now",
		description: "Returns the current date and time in a human readable format.",
		detail: "Date.now() // Mon Jan 01 2001 00:00:00 2000",
		symbolKind: 'function'
	},
	{
		name: "nowUTC",
		description: "Returns a string representing the current date and time in UTC.",
		detail: "Datetime.nowUTC() // Fri May 29 02:12:32 2020",
		symbolKind: 'function'
	},
	{
		name: "parse",
		description: "Parses a string representation of a date and time.",
		detail: "Date.parse(string) -> Number",
		symbolKind: 'function'
	},
	{
		name: "getDay",
		description: "Returns the day of the week of a date.",
		detail: "Date.getDay() // 0 (Sunday) to 6 (Saturday)",
		symbolKind: 'function'
	},
	{
		name: "getFullYear",
		description: "Returns the year of a date.",
		detail: "Date.getFullYear() // 2020",
		symbolKind: 'function'
	},
	{
		name: "getHours",
		description: "Returns the hour of a date.",
		detail: "Date.getHours() // 0 to 23",
		symbolKind: 'function'
	},
	{
		name: "getSeconds",
		description: "Returns the seconds of a date.",
		detail: "Date.getSeconds() // 0 to 59",
		symbolKind: 'function'
	},
	{
		name: "getMilliseconds",
		description: "Returns the milliseconds of a date.",
		detail: "Date.getMilliseconds() // 0 to 999",
		symbolKind: 'function'
	},
	{
		name: "getMinutes",
		description: "Returns the minutes of a date.",
		detail: "Date.getMinutes() // 0 to 59",
		symbolKind: 'function'
	},
	{
		name: "getMonth",
		description: "Returns the month of a date.",
		detail: "Date.getMonth() // 0 to 11",
		symbolKind: 'function'
	},
	{
		name: "getTime",
		description: "Returns number of milliseconds since a date.",
		detail: "Date.getTime() // 1589788400000",
		symbolKind: 'function'
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
		symbolKind: 'function'
	},
	{
		name: "dirname",
		description: "Returns the directory name of the path.",
		detail: "Path.dirname('/usr/bin')",
		symbolKind: 'function'
	},
	{
		name: "extname",
		description: "Returns the extension of the path.",
		detail: "Path.extname('/src/main.txt')",
		symbolKind: 'function'
	},
	{
		name: "isAbsolute",
		description: "Returns true if the path is absolute.",
		detail: "Path.isAbsolute('/usr')",
		symbolKind: 'function'
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
		symbolKind: 'function'
	},
	{
		name: "set",
		description: "Chanages or adds an environment variable. When setting a variable, the value must be a string. Returns a boolean indicating whether the operation was successful.",
		detail: "Env.set('key', 'test')",
		symbolKind: 'function'
	},
	{
		name: "delete",
		description: "Deletes an environment variable. Returns a boolean indicating whether the operation was successful.",
		detail: "Env.delete('key')",
		symbolKind: 'function'
	},
	{
		name: "getAll",
		description: "Returns an object containing all environment variables.",
		detail: "Env.getAll()",
		symbolKind: 'function'
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
		symbolKind: 'function'
	},
	{
		name: "read",
		description: "Reads the contents of a file.",
		detail: "File.read('/usr/bin/ls')",
		symbolKind: 'function'
	},
	{
		name: "write",
		description: "Writes the contents of a file.",
		detail: "File.write('/usr/bin/ls', 'Hello World!')",
		symbolKind: 'function'
	},
	{
		name: "close",
		description: "Closes a file.",
		detail: "File.close('/usr/bin/ls')",
		symbolKind: 'function'
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
		symbolKind: 'function'
	},
	{
		name: "post",
		description: "Sends a HTTP POST request to a given URL. Returns a result object upon success.",
		detail: "HTTP.post('https://www.url.com', object)",
		symbolKind: 'function'
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
		symbolKind: 'function'
	},
	{
		name: "decode",
		description: "Base64 decode a given string.",
		detail: "Base64.decode('VGhpcyBpcyBhIHRlc3Q=')",
		symbolKind: 'function'
	},
	// Hashlib
	{
		name: 'Hashlib',
		description: 'Module containing methods for working with different hash algorithms.',
		detail: '(module) Hashlib',
		symbolKind: 'function'
	},
	{
		name: "sha256",
		description: "Hashes a given string using the SHA-256 algorithm.",
		detail: "Hashlib.sha256('This is a test')",
		symbolKind: 'function'
	},
	{
		name: "hmac",
		description: "Generates a HMAC using the SHA-256 algorithm.",
		detail: "Hashlib.hmac('secret', 'This is a test')",
		symbolKind: 'function'
	},
	{
		name: "bcrypt",
		description: "Generates a bcrypt hash.",
		detail: "Hashlib.bcrypt( 'This is a test' )",
		symbolKind: 'function'
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
		symbolKind: 'function'
	},
	{
		name: "acos",
		description: "Returns the arccosine of a number.",
		detail: "Math.acos(x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "asin",
		description: "Returns the arcsine of a number.",
		detail: "Math.asin(x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "atan",
		description: "Returns the arctangent of a number.",
		detail: "Math.atan(x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "atan2",
		description: "Returns the arctangent of the quotient of its arguments.",
		detail: "Math.atan2(y, x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "ceil",
		description: "Returns the smallest integer greater than or equal to a number.",
		detail: "Math.ceil(x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "cos",
		description: "Returns the cosine of a number.",
		detail: "Math.cos(x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "exp",
		description: "Returns the value of E raised to the power of a number.",
		detail: "Math.exp(x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "floor",
		description: "Returns the largest integer less than or equal to a number.",
		detail: "Math.floor(x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "log",
		description: "Returns the natural logarithm (base e) of a number.",
		detail: "Math.log(x, base) -> Number // base defaults to e",
		symbolKind: 'function'
	},
	{
		name: "max",
		description: "Returns the largest of zero or more numbers.",
		detail: "Math.max(value1, value2, ...) -> Number",
		symbolKind: 'function'
	},
	{
		name: "min",
		description: "Returns the smallest of zero or more numbers.",
		detail: "Math.min(value1, value2, ...) -> Number",
		symbolKind: 'function'
	},
	{
		name: "pow",
		description: "Returns base to the exponent power, that is, baseexponent.",
		detail: "Math.pow(x, y) -> Number",
		symbolKind: 'function'
	},
	{
		name: "random",
		description: "Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive).",
		detail: "Math.random() -> Number",
		symbolKind: 'function'
	},
	{
		name: "round",
		description: "Returns the value of a number rounded to the nearest integer.",
		detail: "Math.round(x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "sin",
		description: "Returns the sine of a number.",
		detail: "Math.sin(x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "sqrt",
		description: "Returns the square root of a number.",
		detail: "Math.sqrt(x) -> Number",
		symbolKind: 'function'
	},
	{
		name: "tan",
		description: "Returns the tangent of a number.",
		detail: "Math.tan(x) -> Number",
		symbolKind: 'function'
	},
];


const getModule = (name) => {
	return modules.find(m => m.name === name);
};

const getModules = () => {
	return modules;
};


const builtins: BuiltIns_functions[] = [
		{
			name: "print",
			description: "Prints a value to stdout.",
			detail: "(def)\nprint(values)",
			symbolKind: 'function'
		},
		{
			name: "println",
			description: "Prints a value to stdout with a newline.",
			detail: "(def)\nprintln(values)",
			symbolKind: 'function'
		},
		{
			name: "exit",
			description: "Exits the program.",
			detail: "exit()",
			symbolKind: 'function'
		},
		{
			name: "clear",
			description: "Clears the screen.",
			detail: "clear()",
			symbolKind: 'function'
		},
		{
			name: "delay",
			description: "Delay the program for a given amount of milliseconds.",
			detail: "delay(1000) // 1 second",
			symbolKind: 'function'
		},
		{
			name: "input",
			description: "Retrieves input from stdin and returns value as a string",
			detail: "input(\"Enter your name: \") // Optional prompt",
			symbolKind: 'function'
		},
		{
			name: "typeof",
			description: "Returns the type of a given value as a string.",
			detail: "typeof(10) -> \"int\"\ntypeof(\"test\") -> \"string\"\ntypeof(true) -> \"bool\"\ntypeof(none) -> \"none\"",
			symbolKind: 'function'
		},
		{
			name: "assert",
			description: "Raise a runtime error if the given expression is not true.",
			detail: "assert(10 > 5)",
			symbolKind: 'function'
		},
		{
			name: "isDefined",
			description: "Returns a boolean value indicating whether the given value is defined or not.",
			detail: "isDefined('test') -> true\nisDefined(none) -> false",
			symbolKind: 'function'
	},
	{
		name: "exit",
		description: "Exits the program.",
		detail: "exit()",
		symbolKind: 'function'
	}
];


const getBuiltIn = (name) => {
	return builtins.find(b => b.name === name);
};

const getBuiltIns = () => {
	return builtins;
};


export default {
	getModule,
	getModules,
	getBuiltIn,
	getBuiltIns,
};