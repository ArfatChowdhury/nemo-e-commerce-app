// module.exports = function (api) {
//     api.cache(true);
//     return {
//       presets: [
//         ["babel-preset-expo", { jsxImportSource: "nativewind" }],
//         "nativewind/babel",
//       ],
//     };
//   };
  module.exports = function (api) {
    api.cache(true);
    return {
      presets: [['babel-preset-expo', { jsxImportSource: "nativewind" }]],
      plugins: [
        'react-native-reanimated/plugin', // must be last
      ],
    };
  };
  
  

// module.exports = {
//     presets: ['module:metro-react-native-babel-preset'],
//     plugins: [
//       // ... other plugins
//       'react-native-worklets/plugin', // Make sure this line exists and is correct
//       // If you use Reanimated, its plugin should be the last one:
//       // 'react-native-reanimated/plugin', 
//     ],
//   };
  
      // babel.config.js
      // module.exports = function(api) {
      //   api.cache(true);
      //   return {
      //     presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'], // Ensure this line exists and is correct
      //   };
      // };
  
  