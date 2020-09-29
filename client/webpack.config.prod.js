const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const fs = require('fs');
const { styles } = require( '@ckeditor/ckeditor5-dev-utils' );

module.exports = {
    mode: 'development',
    entry: ['@babel/polyfill', './src/index.js'],
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.[hash].js'
    },
    module: {
        rules: [
            // {
            //     test: /\.scss$/,
            //     use: [
            //         'style-loader',
            //         'css-loader',
            //         'sass-loader'
            //     ]
            // },
            // {
            //     test: /\.(js|jsx)$/,
            //     exclude: /node_modules/,
            //     use: {
            //         loader: 'babel-loader',
            //     }
            // },
            // {
            //     test: /\.html$/,
            //     use: ["html-loader"]
            // },
            // {
            //     test: /\.(png|jpg|gif|svg|ico)$/i,
            //     use: [
            //         {
            //             loader: 'file-loader',
            //             options: {
            //                 name: '[name].[ext]?[hash]',
            //                 outputPath: (url, resourcePath, context) => {
            //                     // `resourcePath` is original absolute path to asset
            //                     // `context` is directory where stored asset (`rootContext`) or `context` option
            //                     // To get relative path you can use
            //                     const relativePath = path.relative(context, resourcePath);
                                
            //                     if (relativePath.includes('auth.jpg') || 
            //                         relativePath.includes('undraw_page_not_found_su7k.svg') || 
            //                         relativePath.includes('home.png')) {
            //                       return `images/${url}`;
            //                     }
                    
            //                     return `images/icons/${url}`;
            //                 },
            //                 emitFile: true,
            //                 esModule: false
            //             }
            //         }
            //     ]
            // }
            {
				test: /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
				use: [ 'raw-loader' ]
			},
            {
                test: /\.(css|scss)$/,
                use: [
                    {
						loader: 'style-loader',
						options: {
							injectType: 'singletonStyleTag',
							attributes: {
								'data-cke': true
							}
						}
					},
                    //'css-loader',
                    //'sass-loader',
                    {
						loader: 'postcss-loader',
						options: styles.getPostCssConfig( {
							themeImporter: {
								themePath: require.resolve( '@ckeditor/ckeditor5-theme-lark' )
							},
							minify: true
						} )
					},
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
                exclude: [
                    /\.(js|jsx|mjs)$/,
                    /\.html$/,
                    /\.json$/,
                    /ckeditor5-[^/\\]+[/\\]theme[/\\]icons[/\\][^/\\]+\.svg$/,
                    /ckeditor5-[^/\\]+[/\\]theme[/\\].+\.css/
                ],
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
                    },
                ]
            },
        ]
    },
    devtool: 'source-map',
    plugins: [
        new HtmlWebpackPlugin({
            template: 'public/index.html',
            favicon: 'public/favicon.ico'
        })
    ],
    devServer: {
        hot: true,
        overlay: true,
        historyApiFallback: true,
        compress: true,
        inline: true,
        http2: true,
        https: {
            key: fs.readFileSync('etc/gogetssl/www_jookbob2_com.key'),
            cert: fs.readFileSync('etc/gogetssl/www_jookbob2_com.crt'),
            ca: fs.readFileSync('etc/gogetssl/www_jookbob2_com.ca-bundle'),
        },
        stats: "errors-only",
        contentBase: path.join(__dirname, 'dist'),
        public: 'www.jookbob2.com',
        host: '0.0.0.0', // 모든 host에서의 접근을 허용
        port: 443,
        allowedHosts: [
            'www.jookbob2.com',
            '.jookbob2.com',
            'jookbob2.com'
        ],
        proxy: {
            '**': {
                target: 'http://web:8080',
                bypass: function (req, res, proxyOptions) {
                    if (req.headers.accept.indexOf('html') !== -1) {
                        console.log('Skipping proxy for browser request.');
                        return '/index.html';
                    }
                },
                secure: false
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