/**
 * Created by Binlin.
 * Date 2016/9/26
 * Time 9:29
 */
'use strict';
import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import TransferWebpackPlugin from 'transfer-webpack-plugin';
import Clean from 'clean-webpack-plugin';
import 'whatwg-fetch';

let config = {
    entry:{
        main  : './resource/index.jsx',
    },
    output:{
        path: './dist',
        filename:'[name].bundle.js',
        publicPath: ''
    },
    resolve:{
        alias:{

        },
        root: path.join(__dirname, 'example'),
        extensions: ['', '.js','.jsx'],
    },
    module:{
        loaders:[
            {
                test: /\.js[x]?$/,
                exclude: /node_modules/,
                loader: 'babel-loader' ,
                query:{
                    presets:['es2015','react'],
                    plugins:['transform-runtime']
                },
            },
            {test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") },
            {test: /\.(png|jpg|gif)$/,loader: "url?limit=2500" },
            {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff"},
            {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff2"},
            {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"},
            {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
            {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml"},
        ]
    },
    plugins:[
        new Clean(['dist']),
        new TransferWebpackPlugin([
            {from: 'images', to: 'images'},
            {from: '../project', to: 'project'}
        ], path.join(__dirname, 'resource')),
        new webpack.ProvidePlugin({
            _ : 'lodash',
            $ : 'jquery',
            jQuery : 'jquery',
            React:'react',
            classNames:'classnames'
        }),
        new ExtractTextPlugin('[name].bundle.css'),
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
        new HtmlWebpackPlugin({
            title:'Blog',
            template: './resource/index.ejs',
            hash: true,
            minify: {
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true
            }
        }),
    ]
}

module.exports = config;