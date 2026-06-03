const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");
const path = require("path");

// 1. Buscamos la raíz del monorepo de forma manual
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "../..");

const config = getDefaultConfig(projectRoot);

// 2. Le ordenamos a Metro que vigile tanto la app de Expo como los node_modules globales del workspace
config.watchFolders = [workspaceRoot];
config.resolver.nodeModulesPaths = [
  path.resolve(projectRoot, "node_modules"),
  path.resolve(workspaceRoot, "node_modules"),
];

// 3. Aplicamos la capa de NativeWind apuntando al CSS local
module.exports = withNativeWind(config, { input: "./global.css" });