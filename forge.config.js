const path = require('path');
const fs = require('fs');
const assert = require('assert');
const cpy = require('cpy');
const pkg = require('./package.json');

const getIconPath = (format, size = 128) => {
    const iconPath = path.normalize(
        path.join(__dirname, 'src', 'assets', 'img', `${size}x${size}.${format}`));

    assert.ok(fs.existsSync(iconPath));

    return iconPath;
};

const icons = {
    ico: getIconPath('ico'),
    png: getIconPath('png'),
};

const description = 'Send SMS, Text2Speech messages and more via Sms77.io.';

module.exports = {
    hooks: {
        async packageAfterExtract() {
            await cpy( // needed or logo wont be shown in production
                [path.resolve(__dirname, '.webpack/renderer/*.*')],
                path.resolve(__dirname, '.webpack/renderer/main_window')
            );
        },
    },
    makers: [
        {
            name: '@electron-forge/maker-zip',
            platforms: [
                'darwin',
            ],
        },
        {
            name: '@electron-forge/maker-squirrel',
            config: {
                description,
                iconUrl: icons.ico,
                name: pkg.name,
                setupIcon: icons.ico,
            },
        },
        {
            name: '@electron-forge/maker-deb',
            config: {
                options: {
                    categories: [
                        'Utility',
                        'Office'
                    ],
                    description,
                    genericName: 'sms77io Desktop Application',
                    homepage: 'https://www.sms77.io/',
                    icon: icons.png,
                    maintainer: pkg.author,
                    name: pkg.name,
                    productDescription: 'Application to send SMS through the sms77io gateway.',
                    productName: 'sms77io Desktop Application',
                    section: 'mail',
                    version: pkg.version
                }
            }
        },
        {
            name: '@electron-forge/maker-dmg',
            config: {
                additionalDMGOptions: {
                    // 'code-sign': {identifier: 'io.sms77.desktop'}, // TODO: add signing-identity
                    'icon-size': 256,
                },
                icon: getIconPath('png', 256),
                iconSize: 256,
                name: pkg.name,
            }
        },
        {
            name: '@electron-forge/maker-rpm',
            config: {
                description,
                icon: icons.png,
                name: pkg.name,
                version: pkg.version,
            }
        }
    ],
    packagerConfig: {
        appCategoryType: 'public.app-category.social-networking', // MacOSX only
        appCopyright: pkg.author,
        icon: icons.png.replace('.png', ''), // omit file extension for auto detecting according to OS
    },
    plugins: [
        /* TODO: add back?
              [
                    '@electron-forge/plugin-electronegativity',
                    {
                        isSarif: true,
                    },
                ],*/
        [
            '@electron-forge/plugin-webpack',
            {
                mainConfig: './webpack.main.config.js',
                renderer: {
                    config: './webpack.renderer.config.js',
                    entryPoints: [{
                        html: './src/index.html',
                        js: './src/renderer.ts',
                        name: 'main_window',
                    },],
                }
            }
        ]
    ],
    publishers: [
        {
            config: {
                prerelease: true,
                repository: {
                    name: 'desktop',
                    owner: 'sms77io',
                },
            },
            name: '@electron-forge/publisher-github',
        },
    ],
};