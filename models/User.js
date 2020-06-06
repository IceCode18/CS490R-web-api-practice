const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: null
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    user_type:{
        type: String,
        default: "User"
    },
    posts:{
        type: [],
        default: null
    }
});

UserSchema.pre('save', async function(next){
    if(this.isModified('password') || this.isNew){
        const hash = await bcrypt.hash(this.password, 10)
        this.password = hash
        next()
    }else{
        return next()
    }
});

UserSchema.methods.comparePassword = function(password, cb){
    bcrypt.compare(password, this.password, (err, isMatch) => {
        if(err){
            return cb(err);
        }
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', UserSchema);