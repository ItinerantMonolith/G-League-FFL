const AppRouter = require('./routes/AppRouter');
const express = require('express');
const logger = require('morgan')
const cors = require('cors')
const bodyparser = require('body-parser')
const helmet = require('helmet')
const connection = require('./db/connection');
const path = require('path')

const PORT = process.env.PORT || 3001;
const app = express();

// Initialize Middlewarenpx
app.use(helmet({ contentSecurityPolicy: false }))
// app.use(compression())
app.use(cors())
app.use(express.static(path.join(__dirname, 'client', 'build')))
app.use(logger('dev'))
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.disable('X-Powered-By')

app.use('/api', AppRouter)
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')))


app.get('/test', (req, res) => res.send({ msg: 'Server Working' }))

app.listen(PORT, async () => {
    try {
        await connection;
        console.log('Database Connected');
    } catch (error) {
        throw new Error('Connection Error', error);
    }
});
