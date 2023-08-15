const {Schema, model} = require('mongoose')

const UserSchema = new Schema({
    email: {type: String, unique: true, required: true},
    password: {type: String, required: true},
    login: {type: String, unique: true, required: true},
    // ИЗМЕНИЛ МОДЕЛЬ ПОЛЬЗОВАТЕЛЯ ДОБАВИЛ ИМЯ АВАТАР
    name: {type: String, required: true},
    ava: {type: String},
    // 
    isActivated: {type: Boolean, default: false},
    activationLink: {type: String},
})

module.exports = model('User', UserSchema)