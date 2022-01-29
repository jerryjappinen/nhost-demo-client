// const svgoSettings = {
//   removeViewBox: false,
//   removeTitle: true,

//   // cleanupIds: {
//   //   remove: false,
//   //   minify: false,
//   //   prefix: 'svg-'
//   // },

//   // https://github.com/svg/svgo/blob/master/plugins/convertTransform.js
//   convertTransform: {
//     degPrecision: 0,
//     floatPrecision: 0,
//     transformPrecision: 0
//   },

//   convertColors: {
//     names2hex: true,
//     rgb2hex: true,
//     shorthex: true,
//     shortname: true,

//     // Convert this color code in fills/strokes/etc. to currentColor (used to generate mono-capable assets)
//     // NOTE: must be exact, case-sensitive match before any other conversions
//     // Assets must be authored with this in mind
//     // https://github.com/svg/svgo/blob/master/plugins/_collections.js#L2527
//     // https://github.com/svg/svgo/blob/master/plugins/convertColors.js#L61
//     currentColor: '#FF00FF'

//   }
// }

module.exports = {

  pages: {
    index: {
      entry: 'src/main.js',
      title: 'Secure Upload'
    }
  },

  css: {
    loaderOptions: {
      css: {},
      scss: {}
    }
  }

  // chainWebpack: (config) => {
  //   // Modify the SVGO config to match the format the plugin expects
  //   const svgoPlugins = []
  //   for (const pluginName in svgoSettings) {
  //     svgoPlugins.push({
  //       [pluginName]: svgoSettings[pluginName]
  //     })
  //   }

  //   const svgRule = config.module.rule('svg')

  //   svgRule.uses.clear()

  //   svgRule
  //     .use('babel-loader')
  //     .loader('babel-loader')
  //     .end()
  //     .use('vue-svg-loader')
  //     .loader('vue-svg-loader')
  //     .options({
  //       svgo: {
  //         plugins: svgoPlugins
  //       }
  //     })
  // }

}
