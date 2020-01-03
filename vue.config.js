// vue.config.js
module.exports = {
    // options...
    runtimeCompiler: true,
    //Git pages
    publicPath: process.env.NODE_ENV === 'production'
    ? '/truecaller_demo/'
    : '/'
  }