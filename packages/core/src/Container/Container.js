// @flow
/* eslint-disable global-require */
import { Container, LifeTime } from 'container-ioc';

const container: Container = new Container({
    defaultLifeTime: LifeTime.PerRequest
});

container.register([
    // Services
    {
        token:    'DataTable',
        useClass: require('../Service/DataTable/DataTable')
    },
    {
        token:    'ModelManager',
        useClass: require('../Service/ModelManager/ModelManager')
    }
]);

export default container;
