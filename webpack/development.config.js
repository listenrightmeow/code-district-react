const cwd = process.cwd();
const webpack = require('webpack');
const path = require('path');

const aliases = require(`${cwd}/helpers/webpack/aliases`)();
const bourbon = require('bourbon').includePaths;
const neat = require('bourbon-neat').includePaths[1];
const env = require(`${cwd}/secrets/.generated/variables.json`);

module.exports = () => {
  return {
    devtool: 'cheap-module-eval-source-map',
    entry: {
      'app': `${cwd}/application/react/app.jsx`,
    },
    output: {
      filename: '[name].js',
      chunkFilename: 'chunk.[id].[chunkhash:8].js',
      path: path.join(cwd, 'application', 'react', 'dist', 'js'),
      publicPath: '/js/'
    },
    plugins: [
      function() {
        this.plugin('watch-run', function(watching, callback) {
          console.log('\n>>> Begin compile at ' + new Date() + '\n');
          callback();
        })
      },
      new webpack.DefinePlugin({
        GITHUB_TOKEN: JSON.stringify(env.GITHUB_TOKEN)
      }),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'app',
        children: true,
        async: true,
        minChunks: 2
      })
    ],
    resolve: {
      alias: aliases.resolveAlias,
      extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.sass', '.svg'],
      modules: [`application/react`, 'bower', 'node_modules']
    },
    module: {
      rules: [{
        test: /\.js(x)?$/,
        enforce: 'pre',
        exclude: ['bower', 'node_modules'],
        loader: 'source-map-loader',
        query: {
          sourceMaps: true
        }
      }, {
        test: /\.scss$/,
        loader: `style-loader!css-loader!sass-loader?includePaths[]=${bourbon}&includePaths[]=${neat}`
      }, {
        test: /(\.css)$/,
        loaders: ['style-loader', 'css-loader']
      }, {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }, {
        test: /\.js(x)?$/,
        exclude: /(node_modules|bower)/,
        loader: 'babel-loader',
        query: {
          compact: false,
          presets: [['es2015', { modules: false }], 'react', 'stage-2', 'stage-3'],
          plugins: ['transform-runtime']
        }
      }]
    },
    devServer: {
      contentBase: path.join(cwd, 'application', 'react', 'dist'),
      compress: true,
      historyApiFallback: {
        index: 'index.html'
      },
      hot: true,
      port: 8080,
      overlay: {
        warnings: true,
        errors: true
      },
      stats: {
        chunks: false,
        colors: true,
        version: false
      }
    }
  }
}
