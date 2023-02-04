const express = require('express');
const app = express();
const mongoose = require('mongoose')
var bodyParser = require('body-parser');
const cors = require('cors');
const youtubeVideoRouter = require('./routes/youtubeVideo');
require ('dotenv'). config ();

app.use(express.json());
app.use(cors());

app.use('/youtubeVideo', youtubeVideoRouter
)

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.error('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to database'));

app.listen(27017, () =>  console.log('Server started'))