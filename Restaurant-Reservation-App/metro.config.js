const { getDefaultConfig } = require("expo/metro-config");
<<<<<<< Updated upstream
<<<<<<< Updated upstream
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, { input: './global.css' })
=======
=======
>>>>>>> Stashed changes
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

<<<<<<< Updated upstream
module.exports = withNativeWind(config, { input: "./global.css" });
>>>>>>> Stashed changes
=======
module.exports = withNativeWind(config, { input: "./global.css" });
>>>>>>> Stashed changes
