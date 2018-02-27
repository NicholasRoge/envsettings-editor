const path = require("path");

const RunElectronPlugin = require('run-electron-webpack-plugin');


const DIR_ROOT = path.resolve(__dirname);
const DIR_BUILD = path.resolve(DIR_ROOT, "dist");


module.exports = {
    entry: {
        "app": [
            "babel-polyfill",
            "normalize.css",
            path.resolve(DIR_ROOT, "app", "styles", "core", "main.scss"),
            path.resolve(DIR_ROOT, "app", "core", "main.js")
        ],
        "html": path.resolve(DIR_ROOT, "app", "index.html")
    },

    output: {
        path: DIR_BUILD,

        filename: "[name].js"
    },

    target: "electron-renderer",

    resolve: {
        alias: {
            "$app": path.resolve(DIR_ROOT, 'app'),
            "$data": path.resolve(DIR_ROOT, 'data')
        },
        extensions: ['.js', '.jsx', '.json']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development'
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development'
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV === 'development',
                            includePaths: [
                                path.resolve(DIR_ROOT, 'app', 'styles')
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[name].[ext]"
                        }
                    }
                ]
            }
        ]
    },

    plugins: [
         new RunElectronPlugin(path.resolve(DIR_ROOT, 'main.js'))
    ]
};