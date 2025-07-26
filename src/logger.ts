import { appendFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";

const logPath = join(process.cwd(), "log", "mcp-server.log");

// Ensure log directory exists
const logDir = dirname(logPath);
if (!existsSync(logDir)) {
	mkdirSync(logDir, { recursive: true });
}

const writeLog = (message: string) => {
	const timestamp = new Date().toISOString();
	const levelStr = "INFO";
	const logMessage = `[${timestamp}] ${levelStr} ${message}`;

	// Always write to hardcoded log file
	appendFileSync(logPath, logMessage + "\n");

	// Also check for env variable override
	if (process.env.LOG_FILE) {
		const logfile = process.env.LOG_FILE;
		appendFileSync(logfile, logMessage + "\n");
	}

	console.error(message);
};

export const trace = (message: string) => {
	writeLog(message);
};

export const error = (message: string) => {
	writeLog(message);
};
