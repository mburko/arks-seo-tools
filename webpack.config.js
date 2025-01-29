const Dotenv = require('dotenv-webpack');
const path = require('path');

module.exports = {
    plugins: [
        new Dotenv({
            path: path.resolve(__dirname, '.env.local'),
            defaults: path.resolve(__dirname, '.env'),
            systemvars: true,
            expand: true,
            safe: true,
        }),
    ],
    resolve: {
        fallback: {
            "path": require.resolve("path-browserify"),
            "os": require.resolve("os-browserify/browser"),
            "crypto": require.resolve("crypto-browserify")
        }
    }
};
