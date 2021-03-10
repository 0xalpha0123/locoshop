const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const DotEnv = require("dotenv-webpack");

// Declaration of the basic webpack configuration object
var config = {
  // Enable sourcemaps for debugging webpack's output.
  devtool: "source-map",

  entry: path.resolve(__dirname, "./src/index.tsx"),

  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },

  resolve: {
    // Add '.js', '.ts' and '.tsx' as resolvable extensions.
    extensions: [".js", ".ts", ".tsx"],
  },
  devServer: {
    // Serve index.html as the base
    contentBase: path.resolve(__dirname, "./public"),
    // Enable compression
    compress: true,
    // Enable hot reloading
    hot: true,
    port: 3000,
    // Public path is root of content base
    publicPath: "/",
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "ts-loader",
            options: { allowTsInNodeModules: true },
          },
        ],
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },

      {
        test: /\.svg$/,
        use: [
          {
            loader: "svg-url-loader",
            options: {
              limit: 10000,
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)?$/,
        exclude: /\.ejs$/,
        use: "file-loader",
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              name: "[name].[ext]",
              // outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
};

// Here we have a fonction that gets as argument the mode which webpack will run on
// and chose what configuration to use
module.exports = (env, options) => {
  console.log(`Webpack running in : ${options.mode} mode`);

  config.plugins = [
    new DotEnv({ path: `.env.${options.mode}`, allowEmptyValues: true }),
  ];
  if (options.mode === "development") {
    return config;
  }

  if (options.mode === "production") {
    config.devServer = {};
    config.devtool = false;

    config.plugins.push(
      new CopyPlugin({
        patterns: [
          {
            from: path.resolve(__dirname, "./public"),
            to: path.resolve(__dirname, "./build"),
          },
        ],
      })
    );
    return config;
  }
};
