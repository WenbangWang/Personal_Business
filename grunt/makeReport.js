module.exports = {
    src: 'coverage/api/*.json',
    options: {
        type: ['lcov', 'html'],
        dir: 'coverage/api',
        print: 'detail'
    }
};