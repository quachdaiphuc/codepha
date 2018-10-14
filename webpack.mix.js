let mix = require('laravel-mix');
let webpack = require('webpack');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */
mix.webpackConfig({
    resolve: {
        modules: [
            'resources/assets/js/v2',
            'node_modules'
        ],
        alias: {
            v2: path.resolve(__dirname, 'resources/assets/js/v2/'),
            v2App: path.resolve(__dirname, 'resources/assets/js/v2/app/'),
            v2Asset: path.resolve(__dirname, 'resources/assets/js/v2/app/modules/assets/'),
            v2State: path.resolve(__dirname, 'resources/assets/js/v2/app/modules/states/'),
            v2View: path.resolve(__dirname, 'resources/assets/js/v2/app/modules/views/'),
        }
    },
    output: {
        filename: '[name].js',
    },
});

mix.react('resources/assets/js/v2/index.js', 'public/js/v2').version()
mix.sass('resources/assets/scss/v2/app.scss', 'public/css/v2').version()
