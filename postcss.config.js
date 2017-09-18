module.exports = {
    plugins: [
        require('postcss-smart-import')({ /* ...options */ }), // eslint-disable-line global-require
        require('precss')({ /* ...options */ }), // eslint-disable-line global-require
        require('autoprefixer')({ // eslint-disable-line global-require
            browsers: [ 'last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ],
            cascade:  false
        })
    ]
};
