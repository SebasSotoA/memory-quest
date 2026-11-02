// Learn more https://docs.expo.dev/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// Configurar alias @/ para resolver correctamente los módulos y assets
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot);

config.resolver.alias = {
  '@': projectRoot,
};

// Configurar watchFolders para incluir el workspace root
config.watchFolders = [workspaceRoot];

// Asegurar que los assets se resuelvan correctamente
config.resolver.sourceExts.push('ts', 'tsx', 'js', 'jsx', 'json');

module.exports = config;

