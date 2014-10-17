module.exports = {
  unit: {
    configFile: 'karma.conf.js',
    autoWatch: false,
    singleRun: true,
    port: '<%= app.test.openPort || 9876 %>' // TODO standardize/parameterize this default port
  }
};