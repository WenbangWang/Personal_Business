module.exports = {
    options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
    },

    gruntfile: [
        'Gruntfile.js',
        'grunt/*.js'
    ],

    modules: ['<%= app.modules %>'],

    test: {
        options: {
            jshintrc: '<%= app.test.path %>/.jshintrc'
        },
        src: ['<%= app.test.modules %>']
    }

};