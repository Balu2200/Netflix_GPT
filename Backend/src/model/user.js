const mongoose = require("mongoose");
const validator = require("validator");
const JWT = require("jsonwebtoken");
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
    {
        name :{
            type : String,
            required:true,
            minLength:4,
            maxLength:50
        },
        email :{   
            type : String,
            trim:true,
            lowercase:true,
            required:true,
            unique:true,
            validate(value){
                if(!validator.isEmail(value)){
                    throw new Error ("Invalid email address");
                }
            }

        },
        
        password:{
            trim:true,
            type:String,
            required:true,
            validate(value){
                if(!validator.isStrongPassword(value)){
                    throw new Error ("Enter a strong password");
                }
            }
        }
    },
    {
        timestamps:true
    }
)

userSchema.index({firstName:1, lastName:1});

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordhash = user.password;
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordhash);
    return isPasswordValid;
}

userSchema.methods.getJWT = async function () {
    const user = this;
    const token = JWT.sign({ _id: user._id.toString() }, 'Netflix_GPT', { expiresIn: '7d' });
    return token;
}

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
