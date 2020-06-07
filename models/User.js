const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Comment = require('./Comment');


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


function isAdmin(user){
    if(user.user_type === "Admin"){
        return true;
    }
    else{
        return false;
    }
}
async function isCommentOwner(comment_id, user){
    const comment = await Comment.findOne({_id: comment_id});
    if( user==comment.user_id || isAdmin(user) ){
        return true;
    }
    else{
        console.log(user);
        console.log(comment.user_id);
       return false;
    }
}

module.exports = mongoose.model('User', UserSchema);
module.exports.isAdmin = isAdmin;
module.exports.isCommentOwner = isCommentOwner;