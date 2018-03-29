const path = require("path")

const RunElectronPlugin = require('run-electron-webpack-plugin')


const PATHS = {
    data: path.resolve(__dirname, 'data'),
    dist: path.resolve("dist"),
    src: path.resolve(__dirname, "src")
}


module.exports = {
    entry: {
        "main": [
            "babel-polyfill",
            path.resolve(PATHS["src"], "main.js")
        ]
    },

    output: {
        path: PATHS["dist"],
        publicPath: PATHS["dist"],

        filename: "[name].js"
    },

    target: "electron-main",

    resolve: {
        alias: {
            "$data": PATHS["data"],
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
            }
        ]
    },

    plugins: [
         new RunElectronPlugin(path.resolve(PATHS["dist"], 'main.js')),
    ],

    node: {
        __dirname: false
    }
}