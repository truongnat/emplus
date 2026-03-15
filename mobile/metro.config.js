const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

// Exclude .flow files from bundling
config.resolver.blockList = [/\.flow$/];

module.exports = config;
