require('dotenv').config()
const express = require('express')
const app = express();
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')
const PORT = process.env.PORT || 3300;
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoDbStore = require('connect-mongo')(session)


//database connection
const url = 'mongodb://localhost/pizza';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('Database-Connnection-Successfull...');
})
// .catch(err => {
//     console.log('Connection-Failed...')
// });


// session store

let mongoStore = new MongoDbStore({
      mongooseConnection: connection,
       collection: "sessions"
})

//session-config

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    store: mongoStore,
    saveUninitialized: false,
    cookie: { maxAge: 3000 * 60 * 60 * 24 } // 24 hours
}))



// use flash as middleware
app.use(flash())


//ASSET 
//WHERE ARE THEY(ASSET)
// app.use(express.static('public'))
app.use(express.static('public'))

app.use(express.json())

//global middleware
app.use((req,res,next)=>{
 res.locals.session = req.session
 next()
})

// set template engine 
app.use(expressLayout)
app.set('views', path.join(__dirname, '/resource/views'))
app.set('view engine', 'ejs')
require('./routes/web')(app)

app.listen(PORT, () => {
    console.log("listening on port 3300")
})

