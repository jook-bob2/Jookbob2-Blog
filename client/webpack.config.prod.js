const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const fs = require('fs');

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        publicPath: 'https://www.jookbob2.com/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash].js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.html$/,
                use: ["html-loader"]
            },
            {
                test: /\.(png|jpg|gif|svg|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]?[hash]',
                            outputPath: (url, resourcePath, context) => {
                                // `resourcePath` is original absolute path to asset
                                // `context` is directory where stored asset (`rootContext`) or `context` option
                                // To get relative path you can use
                                const relativePath = path.relative(context, resourcePath);
                                
                                if (relativePath.includes('auth.jpg') || 
                                    relativePath.includes('undraw_page_not_found_su7k.svg') || 
                                    relativePath.includes('home.png')) {
                                  return `images/${url}`;
                                }
                    
                                return `images/icons/${url}`;
                            },
                            emitFile: true,
                            esModule: false
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico'
        })
    ],
    devServer: {
        //http2: true,
        https: {
            key: fs.readFileSync('etc/gogetssl/www_jookbob2_com.key'),
            cert: fs.readFileSync('etc/gogetssl/www_jookbob2_com.crt'),
            ca: fs.readFileSync('etc/gogetssl/www_jookbob2_com.ca-bundle'),
        },
        hot: true,
        stats: "errors-only",
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
        public: 'www.jookbob2.com',
        inline: true,
        host: '0.0.0.0',
        port: 80,
        disableHostCheck: true,
        proxy: {
            '**': {
                target: 'http://web:8081',
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                }
            }
        }
    },
    resolve: {
        modules: [
            path.join(__dirname, "src"),
            "node_modules"
        ]
    },
};