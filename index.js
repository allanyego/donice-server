import mongodb from 'mongodb';
import dotenv from 'dotenv';

import app from './server.js';
import restaurantsDAO from './dao/restaurantsDAO.js';

dotenv.config();

const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

MongoClient.connect(
    process.env.DB_URI,
    {
        maxPoolSize: 50,
        wtimeoutMS: 2500        
    }
).catch(err => {
    console.log(err);
    process.exit(1);
}).then(async client => {
    await restaurantsDAO.injectDB(client);

    app.listen(port, () => {
        console.log(`Listening on port ${port}`);
    });
});
