module.exports = {
    api: {
        script: 'server.js',
        options: {
            args: [
                '<%= api.port %>'
            ],
            cwd: 'api/'
        }
    }
};