const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./src/router/router');
const {initializeDB} = require('./src/utils/sequelize-orm');

app.use(bodyParser.json());
app.use('/test', router);

async function initializeApp(){
    await initializeDB();
}

const server = app.listen(process.env.APP_PORT || 3000, function () {
    const host = server.address().address;
    const port = server.address().port;
    
    console.log("Example app listening at http://%s:%s", host, port);
    initializeApp();
 })

//  [sequelize.literal('sum(message_count)'), 'mc']