module.exports = {
    options: {
        livereload: false,
        livereloadOnError: false
    },

    gruntfile: {
        files: '<%= jshint.gruntfile %>',
        tasks: ['newer:jshint:gruntfile'],
        options: {
            reload: true, // TODO how to restart grunt? only reloads watch task
            livereload: false
        }
    },

    styles: {
        files: '<%= app.styles %>',
        tasks: ['local:styles']
    },

    javascript: {
        files: ['<%= app.modules %>'],
        tasks: ['local:javascript:newer']
    },

    layoutTemplate: {
        files: ['<%= app.path %>/index.html'],
        tasks: ['local:html']
    },

    views: {
        files: ['<%= app.path %>/modules/**/views/*.html']
    },

    images: {
        files: ['<%= app.path %>/modules/**/images/*.{png,jpg,jpeg,gif,webp,svg}']
    }
};