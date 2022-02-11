module.exports = {

  // This should match login settings on Nhost
  devServer: {
    port: 3000
  },

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

}
