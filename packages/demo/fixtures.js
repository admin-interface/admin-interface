const sequelizeFixtures = require('sequelize-fixtures');
const models            = require('./models');

models.sequelize.sync({ force: true }).then(() => {
    // Load Fixtures
    sequelizeFixtures.loadFiles([
        './fixtures/users.json',
        './fixtures/categories.json',
        './fixtures/posts.json',
        './fixtures/comments.json'
    ], models).then(() => process.exit());
});

