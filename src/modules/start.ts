import details from '../../package.json';

export const bullet = '  - ';

/**
 * Prints the application details.
 */
export default function start() {
    console.log(`Epic Games Friends Notifier v${details.version}`);
    console.log(`${bullet}AngaBlue`);
    console.log(`${bullet}https://anga.blue`);
    console.log(`${bullet}Not for distribution`);
}
