const app               = require('express')();
const AdminInterface    = require('@admin-interface/express').AdminInterface;

const adminInterface = new AdminInterface();
adminInterface.setConfigFile(__dirname, 'admin-interface.yaml');

// Your API ...

// Mount Admin Interface
app.use('/admin', adminInterface.middleware());

app.listen(3000, () => global.console.log('run server on 3000 port'));
