const path = require("path");

module.exports = {
  reactStrictMode: true,
  assOptions: {
    includePaths: [path.join(__dirname, "styles")],
    prependData: `@import "global.scss";`,
  },
};
