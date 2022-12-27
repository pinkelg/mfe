module.exports = {
  resolve: { extensions: [".ts", ".tsx", ".js", ".jsx", ".json"] },
  module:{
    rules:[
    {
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/preset-env'],
          plugins: ['@babel/plugin-transform-runtime']
        }
      }
    }
    ]
  },
  
}