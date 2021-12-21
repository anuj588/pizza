const mongoose = require('mongoose')

const Schema = mongoose.Schema
// here Schema word has capital S mean it is class or contructor and it is in diiferent way below new...



// collection of database or skeleton or blueprint
const userSchema = new Schema({
     name: { type: String, required: true },
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },
     role: { type: String, default: 'customer' }
}, { timestamps: { createdAt: 'createdDate', updatedAt: 'updatedDate' } })

const User = mongoose.model('User', userSchema)

module.exports = User