const exe = require('@angablue/exe');
const { resolve } = require('path');
const { version } = require('./package.json');

const options = {
    target: 'latest-win-x64',
    pkg: ['-C', 'GZip'],
    version,
    icon: resolve('./assets/icon.ico')
};

function build(name, entry) {
    const properties = {
        FileDescription: name,
        ProductName: name,
        LegalCopyright: 'AngaBlue https://anga.blue',
        OriginalFilename: `${name}.exe`
    };

    return exe({
        ...options,
        out: resolve(`./build/${name}.exe`),
        entry: resolve(`./dist/src/${entry}.js`),
        properties
    });
}

(async () => {
    await build('Epic Games Friends Notifier', 'index');
})();
