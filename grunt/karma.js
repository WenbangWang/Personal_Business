module.exports = {
    app: {
        configFile: 'karma.conf.js',
        autoWatch: false,
        singleRun: true,
        port: '<%= app.test.port || 9876 %>' // TODO standardize/parameterize this default port
    }
};