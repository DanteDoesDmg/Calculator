var path = require('path');
var Html = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: './js/app.js',
    output: {
        filename: './main.js',
        path: path.resolve(__dirname, 'docs')
    },
    mode: 'development',
    watch: true,
    module: {
        rules: [{
            // Ta reguła przetwarza pliki z rozszerzeniem .js (zgodnie z wartością w test)
            test: /\.js$/,
            // Nie bierzemy pod uwagę plików .js w node_modules
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                useBuiltIns: 'entry'
                            }
                        ]
                    ]
                }
            }
        }, {
            // Ta reguła przetwarza pliki z rozszerzeniem .scss (zgodnie z wartością w test)
            test: /\.scss$/,
            use: [
                // Załącza CSS-a do tagu <style> HTML-a wynikowego
                'style-loader',
                // Importuje CSS do JS (umożliwia wykonanie require() w pliku .js)
                'css-loader',
                // Uruchomienie Autoprefixera w celu dodania vendor prefixes do CSS-a
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [
                            new autoprefixer({
                                browsers: [
                                    'ie 11'
                                ]
                            })
                        ]
                    }
                },
                // Przetworzenie plików .scss ma CSS
                'sass-loader'
            ]
        }]
    },
    plugins: [
        new Html({
            filename: 'index.html',
            template: './index.html'
        })
    ]
};
