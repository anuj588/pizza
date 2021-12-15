const express = require('express')

const app = express();
const ejs = require('ejs')
const path = require('path')
const expressLayout = require('express-ejs-layouts')

const PORT = process.env.PORT || 3300;

//ASSET 
//WHERE ARE THEY(ASSET)
app.use(express.static('public'))


app.get('/',(req,res) =>{
res.render("home")
})


// set template engine 

app.use(expressLayout)
app.set('views',path.join(__dirname,'/resource/views'))
app.set('view engine','ejs')

app.listen(PORT, () => {
    console.log("listening on port 3300")
})

