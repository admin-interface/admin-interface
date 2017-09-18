/* eslint global-require:0 */
if (process.env.NODE_ENV === 'ai_development') {
    module.exports = require('./src/index');
} else {
    module.exports = require('./dist/index');
}
