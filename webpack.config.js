const path = require("path");


const DIR_ROOT = path.resolve(__dirname);
const DIR_BUILD = path.resolve(DIR_ROOT, "dist");


module.exports = {
    entry: {
        "app": [
            "babel-polyfill",
            path.resolve(DIR_ROOT, "app", "core", "main.js")
        ]
    },

    output: {
        path: DIR_BUILD,

        filename: "[name].js"
    },

    target: "electron-renderer",

    resolve: {
        alias: {
            "~": path.resolve(DIR_ROOT, 'app')
        },
        extensions: ['.js', '.jsx']
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: "babel-loader",
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
                            sourceMap: process.env.NODE_ENV === 'development'
                        }
                    }
                ]
            }
        ]
    }
};