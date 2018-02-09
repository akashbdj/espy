import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/espy')
mongoose.Promise = global.Promise

const { Schema } = mongoose

const LocationSchema = new Schema({
    type: { type: String },
    coordinates: []
})

const UserSchema = new Schema({
    name: String,
    email: String,
    password: String,
    loc: LocationSchema
})

UserSchema.index({ loc: '2dsphere' })

const UserModel = mongoose.model('User', UserSchema)

export default {
    UserModel
}
