export default {
  plugins: [
    [
      '@snowpack/plugin-webpack',
      {
        sourceMap: true,
        outputPattern: {
          js: '[name]-[id].js',
        },
        extendConfig: (config) =>  config,
        manifest: true,
        htmlMinifierOptions: true
      },
    ],
  ]
};
