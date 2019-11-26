const path = require('path');
const webpack = require('webpack');
const packageJson = require("./package");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const fs = require("fs");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ejsTemplatesPath = path.resolve(__dirname, "src", "templates"),
      pagesJsPath = path.resolve(__dirname , "src", "pages"),
      publicPath = path.resolve(__dirname, "../public");


module.exports = {
    entry: {vendor: Object.keys(packageJson.dependencies), ...generateEntry(pagesJsPath, ".js")},
    output: {
        publicPath: '/static/',
        path: path.resolve(publicPath),
        filename: 'bundles/[name].[chunkhash].js'
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', {
                    loader: 'postcss-loader', // для бутстрапа + дивитись https://bootstrap-4.ru/docs/4.0/getting-started/webpack/
                    options: {
                        plugins: function () {
                            return [
                                require('precss'),
                                require('autoprefixer')
                            ];
                        }
                    }},'sass-loader']

            },
            { test: /\.ejs$/, loader: 'ejs-loader', query: {
                    interpolate: '\\{\\[(.+?)\\]\\}',
                    evaluate: '\\{%([\\s\\S]+?)%\\}',
                    escape: '\\{\\{(.+?)\\}\\}'
                }},
            {
                test: /\.(jpg|png|svg|ico)$/,
                loader: 'file-loader',
                options: {
                    // outputPath: (url, resourcePath, context) => {
                    //     console.log(url, resourcePath, context, '---- output path',  path.relative(context, resourcePath));
                    //     return '/static/' + url;
                    // },
                    outputPath: "/static/",
                    // publicPath: "/static/",
                    name: '[name].[ext]'
                },
            },
            {
                test: /\.(woff2)$/,
                loader: 'file-loader',
                options: {
                    outputPath: "/static/fonts",
                    name: '[name].[ext]'
                },
            },
        ]
    },
    plugins: [
        // new CleanWebpackPlugin(),  --- забагато удаляє
        new webpack.HashedModuleIdsPlugin(),
        new MiniCssExtractPlugin({
            filename: 'styles/[name].[hash].css'
        }),

        new WebpackMd5Hash(),
    ].concat(generatePluginForTemplates(ejsTemplatesPath, path.resolve(publicPath, 'views'),".ejs")),
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendor: {
                    chunks: 'initial',
                    name: 'vendor',
                    test: 'vendor',
                    filename: 'bundles/vendor.[chunkhash].js',
                    enforce: true,  //Tells webpack to ignore splitChunks.minSize, splitChunks.minChunks, splitChunks.maxAsyncRequests and splitChunks.maxInitialRequests options and always create chunks for this cache group.
                },
            },
        },
    },
};


function generateEntry(pathToFiles, prefix) {
    let files = walkSync(pathToFiles),
        result =  {};
    files.forEach(file => {
        result[file.replace(prefix, "")] = `${pathToFiles}/${file}`;
    });
    return result;
}

function generatePluginForTemplates(pathToFiles, outputPath , prefix) {
    let files = walkSync(pathToFiles);
    files = files.map(file => {
        let chunks = [file.replace(prefix, "")];
        return new HtmlWebpackPlugin({
            template: `${pathToFiles}/${file}`,
            chunks: isRootFile(file) ? ['vendor', ...chunks]: chunks,
            filename: path.resolve(outputPath, file),
            name: file.replace(prefix, "")
        });
    });
    return files;
}

function isRootFile(name) {
    return name.indexOf('/') === -1;
}

function walkSync(dir, filelist, isDirectory=false, directory='') {
    var path = path || require('path');
    var fs = fs || require('fs'),
        files = fs.readdirSync(dir);
    filelist = filelist || [];
    files.forEach(function(file) {
        if (fs.statSync(path.join(dir, file)).isDirectory()) {
            filelist = walkSync(path.join(dir, file), filelist, true, file);
        }
        else {
            filelist.push(isDirectory? path.join(directory, file): file);
        }
    });
    return filelist;
};