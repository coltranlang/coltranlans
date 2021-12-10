interface Modules {
	name: string;
	description: string;
	detail: string;
}

interface BuiltIns_Task {
	name: string;
	description: string;
	detail: string;
}

const modules: Modules[] = [
	// System
	{
		name: 'System',
		description: 'This module contains methods for system operations.',
		detail: '(module) System'
	},
	{
		name: 'stdin',
		description: '',
		detail: '(variable) stdin',
	},
	{
		name: 'stdout',
		description: '',
		detail: '(variable) stdout',
	},
	{
		name: 'stderr',
		description: '',
		detail: '(variable) stderr',
	},
	{
		name: 'exit',
		description: 'This task terminates the current process.',
		detail: 'System.exit(code)',
	},
	{
		name: 'read',
		description: 'Reads a line from the standard input stream.',
		detail: 'System.stdin.read() -> String',
	},
	{
		name: 'write',
		description: 'Writes a string to the standard output stream.',
		detail: 'System.stdout.write(String)',
	},
	// Process
	{
		name: 'Process',
		description: 'This module contains methods for process operations.',
		detail: '(module) Process'
	},
	{
		name: "exec",
		description: "Executes a given command and returns the result object. Waits for the command to finish before returning.",
		detail: "Process.exec(['ls', '-l'])"
	},
	{
		name: "run",
		description: "Executes a given command and returns the result object. Does not wait for the command to finish before returning.",
		detail: "Process.run(['ls', '-l'])"
	},
	// Math
	{
		name: 'Math',
		description: 'This module contains methods for mathematical operations.',
		detail: '(module) Math',
	},
	{
		name: "abs",
		description: "Returns the absolute value of a number.",
		detail: "Math.abs(x) -> Number"
	},
	{
		name: "acos",
		description: "Returns the arccosine of a number.",
		detail: "Math.acos(x) -> Number"
	},
	{
		name: "asin",
		description: "Returns the arcsine of a number.",
		detail: "Math.asin(x) -> Number"
	},
	{
		name: "atan",
		description: "Returns the arctangent of a number.",
		detail: "Math.atan(x) -> Number"
	},
	{
		name: "atan2",
		description: "Returns the arctangent of the quotient of its arguments.",
		detail: "Math.atan2(y, x) -> Number"
	},
	{
		name: "ceil",
		description: "Returns the smallest integer greater than or equal to a number.",
		detail: "Math.ceil(x) -> Number"
	},
	{
		name: "cos",
		description: "Returns the cosine of a number.",
		detail: "Math.cos(x) -> Number"
	},
	{
		name: "exp",
		description: "Returns the value of E raised to the power of a number.",
		detail: "Math.exp(x) -> Number"
	},
	{
		name: "floor",
		description: "Returns the largest integer less than or equal to a number.",
		detail: "Math.floor(x) -> Number"
	},
	{
		name: "log",
		description: "Returns the natural logarithm (base e) of a number.",
		detail: "Math.log(x, base) -> Number // base defaults to e"
	},
	{
		name: "max",
		description: "Returns the largest of zero or more numbers.",
		detail: "Math.max(value1, value2, ...) -> Number"
	},
	{
		name: "min",
		description: "Returns the smallest of zero or more numbers.",
		detail: "Math.min(value1, value2, ...) -> Number"
	},
	{
		name: "pow",
		description: "Returns base to the exponent power, that is, baseexponent.",
		detail: "Math.pow(x, y) -> Number"
	},
	{
		name: "random",
		description: "Returns a pseudo-random number between 0 (inclusive) and 1 (exclusive).",
		detail: "Math.random() -> Number"
	},
	{
		name: "round",
		description: "Returns the value of a number rounded to the nearest integer.",
		detail: "Math.round(x) -> Number"
	},
	{
		name: "sin",
		description: "Returns the sine of a number.",
		detail: "Math.sin(x) -> Number"
	},
	{
		name: "sqrt",
		description: "Returns the square root of a number.",
		detail: "Math.sqrt(x) -> Number"
	},
	{
		name: "tan",
		description: "Returns the tangent of a number.",
		detail: "Math.tan(x) -> Number"
	},
	// Date
	{
		name: 'Date',
		description: 'This module contains methods for date operations.',
		detail: '(module) Date'
	},
	{
		name: "new",
		description: "Creates a new Date object.",
		detail: "Date.new(year, month, day, hour, minute, second, millisecond) -> Date"
	},
	{
		name: "now",
		description: "Returns the current date and time in a human readable format.",
		detail: "Date.now() // Mon Jan 01 2001 00:00:00 2000"
	},
	{
		name: "nowUTC",
		description: "Returns a string representing the current date and time in UTC.",
		detail: "Datetime.nowUTC() // Fri May 29 02:12:32 2020"
	},
	{
		name: "parse",
		description: "Parses a string representation of a date and time.",
		detail: "Date.parse(string) -> Number"
	},
	{
		name: "getDay",
		description: "Returns the day of the week of a date.",
		detail: "Date.getDay() // 0 (Sunday) to 6 (Saturday)"
	},
	{
		name: "getFullYear",
		description: "Returns the year of a date.",
		detail: "Date.getFullYear() // 2020"
	},
	{
		name: "getHours",
		description: "Returns the hour of a date.",
		detail: "Date.getHours() // 0 to 23"
	},
	{
		name: "getSeconds",
		description: "Returns the seconds of a date.",
		detail: "Date.getSeconds() // 0 to 59"
	},
	{
		name: "getMilliseconds",
		description: "Returns the milliseconds of a date.",
		detail: "Date.getMilliseconds() // 0 to 999"
	},
	{
		name: "getMinutes",
		description: "Returns the minutes of a date.",
		detail: "Date.getMinutes() // 0 to 59"
	},
	{
		name: "getMonth",
		description: "Returns the month of a date.",
		detail: "Date.getMonth() // 0 to 11"
	},
	{
		name: "getTime",
		description: "Returns number of milliseconds since a date.",
		detail: "Date.getTime() // 1589788400000"
	},
	// Path
	{
		name: 'Path',
		description: 'This module contains methods for path operations.',
		detail: '(module) Path'
	},
	{
		name: "basename",
		description: "Returns the basename of the path.",
		detail: "Path.basename('/usr/bin')"
	},
	{
		name: "dirname",
		description: "Returns the directory name of the path.",
		detail: "Path.dirname('/usr/bin')"
	},
	{
		name: "extname",
		description: "Returns the extension of the path.",
		detail: "Path.extname('/src/main.txt')"
	},
	{
		name: "isAbsolute",
		description: "Returns true if the path is absolute.",
		detail: "Path.isAbsolute('/usr')"
	},
	// Env
	{
		name: 'Env',
		description: 'This module contains methods for environment operations.',
		detail: '(module) Env'
	},
	{
		name: "get",
		description: "Returns the value of an environment variable.",
		detail: "Env.get('URL')"
	},
	{
		name: "set",
		description: "Chanages or adds an environment variable. When setting a variable, the value must be a string. Returns a boolean indicating whether the operation was successful.",
		detail: "Env.set('key', 'test')"
	},
	{
		name: "delete",
		description: "Deletes an environment variable. Returns a boolean indicating whether the operation was successful.",
		detail: "Env.delete('key')"
	},
	{
		name: "getAll",
		description: "Returns an object containing all environment variables.",
		detail: "Env.getAll()"
	},
	// File
	{
		name: 'File',
		description: 'This module contains methods for file operations.',
		detail: '(module) File'
	},
	{
		name: "exists",
		description: "Returns true if the file exists.",
		detail: "File.exists('/usr/bin/ls')"
	},
	{
		name: "read",
		description: "Reads the contents of a file.",
		detail: "File.read('/usr/bin/ls')"
	},
	{
		name: "write",
		description: "Writes the contents of a file.",
		detail: "File.write('/usr/bin/ls', 'Hello World!')"
	},
	{
		name: "close",
		description: "Closes a file.",
		detail: "File.close('/usr/bin/ls')"
	},
	// Http 
	{
		name: 'Http',
		description: 'This module contains methods for working with HTTP.',
		detail: '(module) Http'
	},
	{
		name: "get",
		description: "Sends a HTTP GET request to a given URL. Returns a result object.",
		detail: "HTTP.get('https://www.url.com')"
	},
	{
		name: "post",
		description: "Sends a HTTP POST request to a given URL. Returns a result object upon success.",
		detail: "HTTP.post('https://www.url.com', object)"
	},
	// Base64
	{
		name: 'Base64',
		description: 'This module contains methods for working with Base64.',
		detail: '(module) Base64'
	},
	{
		name: "encode",
		description: "Base64 encode a given string.",
		detail: "Base64.encode('This is a test')"
	},
	{
		name: "decode",
		description: "Base64 decode a given string.",
		detail: "Base64.decode('VGhpcyBpcyBhIHRlc3Q=')"
	},
	// Hashlib
	{
		name: 'Hashlib',
		description: 'Module containing methods for working with different hash algorithms.',
		detail: '(module) Hashlib'
	},
	{
		name: "sha256",
		description: "Hashes a given string using the SHA-256 algorithm.",
		detail: "Hashlib.sha256('This is a test')"
	},
	{
		name: "hmac",
		description: "Generates a HMAC using the SHA-256 algorithm.",
		detail: "Hashlib.hmac('secret', 'This is a test')"
	},
	{
		name: "bcrypt",
		description: "Generates a bcrypt hash.",
		detail: "Hashlib.bcrypt( 'This is a test' )"
	}
];


const getModule = (name) => {
	return modules.find(m => m.name === name);
};




const builtins: BuiltIns_Task[] = [
		{
			name: "print",
			description: "Prints a value to stdout.",
			detail: "(task)\nprint(values)",
		},
		{
			name: "println",
			description: "Prints a value to stdout with a newline.",
			detail: "println(10, 'testing', none, true) // 10\ntesting\n none\ntrue"
		},
		{
			name: "exit",
			description: "Exits the program.",
			detail: "exit()"
		},
		{
			name: "clear",
			description: "Clears the screen.",
			detail: "clear()"
		},
		{
			name: "delay",
			description: "Delay the program for a given amount of milliseconds.",
			detail: "delay(1000) // 1 second"
		},
		{
			name: "input",
			description: "Retrieves input from stdin and returns value as a string",
			detail: "input(\"Enter your name: \") // Optional prompt"
		},
		{
			name: "typeof",
			description: "Returns the type of a given value as a string.",
			detail: "typeof(10) -> \"int\"\ntypeof(\"test\") -> \"string\"\ntypeof(true) -> \"bool\"\ntypeof(none) -> \"none\""
		},
		{
			name: "assert",
			description: "Raise a runtime error if the given expression is not true.",
			detail: "assert(10 > 5)"
		},
		{
			name: "isDefined",
			description: "Returns a boolean value indicating whether the given value is defined or not.",
			detail: "isDefined('test') -> true\nisDefined(none) -> false"
		}
];


const getBuiltIn = (name) => {
	return builtins.find(b => b.name === name);
};



export default {
	getModule,
	getBuiltIn
};