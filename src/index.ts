import parsedConfig, { RequiredConfig } from './modules/config';
import start from './modules/start';

start();

const config = parsedConfig as RequiredConfig<'post'>;

(async () => {


})();
