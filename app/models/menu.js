const mongoose = require('mongoose')

const Schema = mongoose.Schema
// here Schema word has capital S mean it is class or contructor and it is in diiferent way below new...



// collection of database or skeleton or blueprint
const menuSchema = new Schema({
     name: { type: String, required: true },
     image: { type: String, required: true },
     price: { type: Number, required: true },
     size: { type: String, required: true }
})

const Menu = mongoose.model('Menu', menuSchema)

module.exports = Menu