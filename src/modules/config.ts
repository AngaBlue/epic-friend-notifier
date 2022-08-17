import fs from 'fs';
import Joi from 'joi';
import path from 'path';
import { exit } from './util';

/**
 * Define the config schema.
 */
export interface Config {
    epic: {
        accountId: string;
        deviceId: string;
        secret: string;
    };
    pushover: {
        applicationKey: string;
        userKey: string;
    };
}
const configSchema = Joi.object({
    epic: {
        accountId: Joi.string().required(),
        deviceId: Joi.string().required(),
        secret: Joi.string().required()
    },
    pushover: {
        applicationKey: Joi.string().required(),
        userKey: Joi.string().required()
    }
});

/**
 * Parse the config file and validate it.
 */
let json: any = {};
try {
    // Blocking read as config is required throughout entire app
    const file = fs.readFileSync(path.join(process.cwd(), 'config.json'), 'utf-8');
    json = JSON.parse(file);
} catch (error) {
    console.error("Failed to load config.json. This could be due to invalid JSON or the file doesn't exist");
    exit();
}

const validation = configSchema.validate(json, { convert: true });
if (validation.error) {
    console.error(`Config Validation Error: ${validation.error.message}`);
    exit();
}

// Create Config
const config: Config = validation.value;

export default config;
