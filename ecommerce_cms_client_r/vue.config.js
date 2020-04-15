module.exports = {
  lintOnSave: true,
  css: {
    loaderOptions: {
      sass: {
        data: `
              @import "@/scss/_variables.scss";
              @import "@/scss/_mixins.scss";
            `
      }
    }
  }
}
