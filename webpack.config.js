const path = require("path");


const DIR_ROOT = path.resolve(__dirname);
const DIR_BUILD = path.resolve(DIR_ROOT, "dist");


module.exports = {
    entry: {
        "app": path.resolve(DIR_ROOT, "app", "core", "main.js")
    },

    output: {
        path: DIR_BUILD,

        filename: "[name].js"
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
                            sourceMap: process.env.NODE_ENV === 'dev'
                        }
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: process.env.NODE_ENV === 'dev'
                        }
                    }
                ]
            }
        ]
    }
};