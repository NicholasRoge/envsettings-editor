const path = require("path");


const DIR_ROOT = path.resolve(__dirname, "..");
const DIR_BUILD = path.resolve(DIR_ROOT, "dist");


module.exports = {
    context: DIR_ROOT,

    entry: [
        "babel-polyfill",
        "normalize.css",
        path.resolve(DIR_ROOT, "app", "index.html"),
        path.resolve(DIR_ROOT, "app", "styles", "core", "main.scss"),
        path.resolve(DIR_ROOT, "app", "core", "main.js")
    ],

    output: {
        path: DIR_BUILD,

        filename: "app.js"
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
    }
};