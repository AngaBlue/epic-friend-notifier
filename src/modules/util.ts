import readline from 'readline-sync';
import config, { Config } from './config';

import details from '../../package.json';

/**
 * Asynchronous wait function
 * @param time
 */
export async function delay(time: number) {
    return new Promise<void>(resolve => {
        setTimeout(() => resolve(), time);
    });
}

/**
 * Safe exits by closing logger before ending the process
 * @param code Exit code
 */
export function exit(code = 1) {
    readline.keyIn('Press any key to close...\n', { hideEchoBack: true, mask: '' });
    process.exit(code);
}

/**
 * Check config
 * @param required Required config keys to check for
 */
export function checkConfig(required: (keyof Config)[]) {
    required.forEach(key => {
        if (!config[key]) {
            console.error(`Missing ${String(key)} config.  Please fill out these settings in config.json`);
            exit();
        }
    });
}

/**
 * Retries an async function until it returns a successful response.
 * @param fn Function to execute
 * @param attempts Number of attempts to execute the function
 * @returns The function return value when successful
 */
// @ts-expect-error
export async function retry<T>(fn: () => Promise<T>, attempts: number = 5): Promise<T> {
    let errCount = 0;

    // Loop for every attempt
    for (let i = 0; errCount < attempts; i++) {
        try {
            return await fn();
        } catch (error) {
            errCount++;
            // Last attempt
            if (errCount === attempts - 1) throw error;
        }
    }
}

export const bullet = '  - ';

/**
 * Prints the application details.
 */
export function start() {
    console.log(`Epic Games Friends Notifier v${details.version}`);
    console.log(`${bullet}AngaBlue`);
    console.log(`${bullet}https://anga.blue`);
}
