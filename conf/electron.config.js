const path = require("path");

const RunElectronPlugin = require('run-electron-webpack-plugin');


const DIR_ROOT = path.resolve(__dirname, '..');
const DIR_BUILD = path.resolve(DIR_ROOT, "dist");


module.exports = {
    context: DIR_ROOT,

    entry: [
        "babel-polyfill",
        path.resolve(DIR_ROOT, "electron", "main.js")
    ],

    output: {
        path: DIR_BUILD,

        filename: "electron.js"
    },

    target: "electron-main",

    node: {
        __dirname: false
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
         new RunElectronPlugin(path.resolve(DIR_BUILD, 'electron.js'))
    ]
};