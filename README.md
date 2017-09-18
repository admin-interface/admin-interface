# Admin Interface

Admin Interface it is library for provide Admin UI on base [Sequelize](https://www.npmjs.com/package/sequelize) and [Express](https://www.npmjs.com/package/express).

As a basis UI is taken [AdminBSB - Material Design](https://github.com/gurayyarar/AdminBSBMaterialDesign)

Also check out our [demo project](https://github.com/admin-interface/admin-interface-demo)

### Installation
```bash
$ npm install --save admin-interface@1.0.0-alpha.1
```

### Connect to Your project
```javascript
const app = require('express')();
const AdminInterface = require('admin-interface').AdminInterface;

const adminInterface = new AdminInterface();
adminInterface.setConfigFile(__dirname, 'admin-interface.yaml');

// Your API ...

// Mount Admin Interface
app.use('/admin', adminInterface.middleware());

app.listen(3000, () => console.log('run server on 3000 port'));
```

### Looking for docs?
* [Admin Interface Documentation](https://github.com/admin-interface/admin-interface/wiki)
* [Admin Interface (JSDOC)](https://admin-interface.github.io/admin-interface/)
* [Sequelize](http://docs.sequelizejs.com/)
* [Express](https://expressjs.com/en/4x/api.html)

### License
**Admin Interface** is an open source project that is licensed under the [MIT license](http://opensource.org/licenses/MIT).
