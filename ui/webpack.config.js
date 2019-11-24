var HtmlWebpackPlugin = require('html-webpack-plugin');
const PATHS = {
    build: __dirname + '/dist/',
    develop: __dirname + '/static'
  }
  

module.exports = {
    entry: [
        //'babel-polyfill',
        'webpack-dev-server/client?http://localhost:3000/',
        //'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
        //'react-hot-loader/patch',
        // 'font-awesome-webpack',
        './src/index.js'
    ],
    devtool: 'eval-source-map',
    mode: 'development',
    resolve: {
        extensions: ['*', '.js', '.jsx', '.css', '.less']
    },
    output: {
        publicPath: 'http://localhost:3000/',
      },
    
    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.less$/,
                loader: 'style-loader!css-loader!less-loader'
            },
            {
                test: /\.css$/, // Only .css files
                use: ['style-loader', 'css-loader'] // Run both loaders
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: "url-loader?limit=25000",
              },
              {
                test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "file-loader"
              },
              {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: "url-loader?limit=10000&mimetype=application/font-woff"
              },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './public/index.html'
    })],
    devServer: {
        contentBase: PATHS.develop,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    hot: true,
    progress: true,
    historyApiFallback: true,

    // Display only errors to reduce the amount of output.
    stats: 'errors-only',

    host: process.env.HOST || 'localhost',
    port: process.env.PORT || '3000',

    },
    externals: {
        // global app config object
        config: JSON.stringify({
            API_URL: 'http://pragma-dev.herokuapp.com'
        })
    }
}