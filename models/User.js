const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    created_at:{
        type: Date,
        default: Date.now
    },
    updated_at:{
        type: Date,
        default: null
    },
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    username:{
        type: String,
        unique: true,
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
module.exports = mongoose.model('Users', UserSchema);