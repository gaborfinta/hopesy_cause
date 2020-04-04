const createApp = require('./app');
const DataStoreFactory = require('./src/datastore/datastorefactory');

const app = createApp(DataStoreFactory('local'));

app.listen(3000, () => console.log('App listening on port 3000'));