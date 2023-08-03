/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
      resolver: {
        sourceExts: ['jsx', 'js', 'ts', 'tsx'], // Add 'ts' and 'tsx' if you're using TypeScript
      },
    }),
  },
};


// module.exports = {
//   resolver: {
//     sourceExts: ['jsx', 'js', 'ts', 'tsx'], // Add 'ts' and 'tsx' if you're using TypeScript
//   },
// };
