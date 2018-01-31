const path = require("path");

module.exports = {
    entry: "./src/index.ts",

    output: {
        path: path.resolve("build"),
        filename: "index.js",
        libraryTarget: "umd",
    },

    resolve: {
        extensions: [".tsx", ".ts", ".js"],
        modules: [path.resolve("./src"), "node_modules"],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: ["awesome-typescript-loader"],
            },
        ],
    },

    plugins: [new DtsBundlePlugin()],

    target: "node",

    node: {
        __dirname: true,
    },
};

function DtsBundlePlugin() {}
DtsBundlePlugin.prototype.apply = function(compiler) {
    compiler.plugin("done", function() {
        var dts = require("dts-bundle");

        dts.bundle({
            name: "docx",
            main: "build/**/*.d.ts",
            out: "index.d.ts",
            removeSource: false,
            outputAsModuleFolder: true, // to use npm in-package typings
        });
    });
};
