module.exports = {

    options: {
        paths: [
            '<%= app.path %>/modules',
            '<%= app.path %>/components'
        ],
        sourceMap: true,
        sourceMapBasepath: '<%= app.path %>',
        sourceMapRootpath: '/'
    },

    master: {
        options: {
            sourceMapFilename: '<%= less.master.dest %>.map',
            sourceMapURL: 'master.css.map'
        },
        dest: '<%= app.temp %>/styles/master.css',
        src: '<%= app.path %>/modules/**/styles/master.less'
    }
};