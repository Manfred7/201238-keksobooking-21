const path = require(`path`);

module.exports = {
  entry: [
    `./js/globals.js`,
    `./js/utils.js`,
    `./js/photoUtils.js`,
    `./js/debounce.js`,
    `./js/eventUtils.js`,
    `./js/backendAPI.js`,
    `./js/filters.js`,
    `./js/card.js`,
    `./js/mapPins.js`,
    `./js/form.js`,
    `./js/map.js`,
    `./js/main.js`
  ],
  output: {
    filename: `bundle.js`,
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
