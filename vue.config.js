const path = require('path');

module.exports = {
  pages: {
    'index': {
      entry: './src/pages/home/main.js',
      template: 'public/index.html',
      title: 'Home',
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    'leaderboard': {
      entry: './src/pages/leaderboard/main.js',
      template: 'public/index.html',
      title: 'Leaderboard',
      chunks: ['chunk-vendors', 'chunk-common', 'leaderboard'],
    },
    'results': {
      entry: './src/pages/results/main.js',
      template: 'public/index.html',
      title: 'Results',
      chunks: ['chunk-vendors', 'chunk-common', 'results'],
    },
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/styles/theme.scss')]
    }
  }
};