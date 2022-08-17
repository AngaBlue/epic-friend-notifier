import fs from 'fs';
import path from 'path';
import GfAPI from 'gfapi';
import { exit, getPlatform, getUPC } from './util';
import { getRLUPC } from '../modules/items/util';
import configSchema, { Config, ConfigParsed } from './config';
import { defaultImage } from './constants';

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
const parsed: ConfigParsed = validation.value;
const config: Config = {
    GFAPI_KEY: parsed.GFAPI_KEY,
    GFAPI_SECRET: parsed.GFAPI_SECRET
};

// Post
if (parsed.post) {
    const platform = getPlatform(parsed.post.platform) || GfAPI.PLATFORM.UNKNOWN;
    const game = (parsed.post.game ? getUPC(parsed.post.game) : getRLUPC(platform)) ?? getRLUPC(platform);
    config.post = {
        ...parsed.post,
        platform,
        game
    };
}

// Credits
if (parsed.credits) {
    const image = parsed.credits.image || config.post?.defaultImageURL || defaultImage;
    const groups = parsed.credits.groups.map(g => {
        if (Array.isArray(g)) return g;
        return Array.from({ length: g.max - g.min + 1 }, (_v, k) => g.min + k);
    });
    config.credits = {
        ...parsed.credits,
        image,
        groups
    };
}

export default config;
export { Config };
export type RequiredConfig<K extends keyof Config> = Config & Required<Pick<Config, K>>;
