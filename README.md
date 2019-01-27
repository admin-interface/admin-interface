# Warning
***At the moment, the project is suspended. As soon as I have more time, I will continue to develop this project.***

# Admin Interface

Admin Interface it is library for provide Admin UI on base [Sequelize](https://www.npmjs.com/package/sequelize) and [Express](https://www.npmjs.com/package/express).

Also check out our [demo project](https://github.com/admin-interface/admin-interface/tree/master/packages/demo)

### Installation
```bash
$ npm install --save @admin-interface/core @admin-interface/express
```

### Connect to Your project
```javascript
const app            = require('express')();
const AdminInterface = require('@admin-interface/express');

const adminInterface = new AdminInterface();
adminInterface.setConfigFile(__dirname, 'admin-interface.yaml');

// Your API ...

// Mount Admin Interface
app.use('/admin', adminInterface.middleware());

app.listen(3000, () => console.log('run server on 3000 port'));
```

### Screenshots
![a](https://raw.githubusercontent.com/admin-interface/admin-interface/master/packages/front/src/images/screenshots/screenshot-1.png)
![a](https://raw.githubusercontent.com/admin-interface/admin-interface/master/packages/front/src/images/screenshots/screenshot-2.png)
![a](https://raw.githubusercontent.com/admin-interface/admin-interface/master/packages/front/src/images/screenshots/screenshot-3.png)

As a basis UI is taken [AdminBSB - Material Design](https://github.com/gurayyarar/AdminBSBMaterialDesign)

### Looking for docs?
* [Admin Interface Documentation](https://github.com/admin-interface/admin-interface/wiki)
* [Admin Interface (JSDOC)](https://admin-interface.github.io/admin-interface/)
* [Sequelize](http://docs.sequelizejs.com/)
* [Express](https://expressjs.com/en/4x/api.html)

### License
**Admin Interface** is an open source project that is licensed under the [MIT license](http://opensource.org/licenses/MIT).
