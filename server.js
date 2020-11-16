const AppRouter = require('./routes/AppRouter');
const express = require('express');
const logger = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const connection = require('./db/connection');

const PORT = process.env.PORT || 3001;
const app = express();

// Initialize Middlewarenpx
app.disable('X-Powered-By')

app.use(logger('dev'));
app.use(helmet())      
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => res.send({ msg: 'Server Working' }));
app.use('/api', AppRouter);

app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Database Connected');
    } catch (error) {
        throw new Error('Connection Error', error);
    }
});
