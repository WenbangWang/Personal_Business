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

    api: ['<%= api.path %>'],

    test: {
        options: {
            jshintrc: 'test/.jshintrc'
        },
        src: [
            '<%= app.test.modules %>',
            '<%= api.path %>'
        ]
    }

};