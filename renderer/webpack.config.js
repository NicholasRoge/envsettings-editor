const path = require("path");


const PATHS = {
    data: path.resolve(__dirname, 'data'),
    dist: path.resolve("dist"),
    src: path.resolve(__dirname, "src")
}

module.exports = {
    entry: {
        "renderer": [
            "babel-polyfill",
            "normalize.css",
            path.resolve(PATHS["src"], "index.html"),
            path.resolve(PATHS["src"], "styles.scss"),
            path.resolve(PATHS["src"], "renderer.js")
        ]
    },

    output: {
        path: PATHS["dist"],
        filename: "[name].js"
    },

    target: "electron-renderer",

    resolve: {
        alias: {  // TODO:  DEcide how this needs to be structured
            "$data": PATHS["data"]
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
                                path.resolve(PATHS['src'], 'styles')
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
}