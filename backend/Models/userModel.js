import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true,unique:true},
        password: {type: String, required: true},
        pic: {type: String,default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"},
         // if user will not upload any picture then default picture will be there
    },{
        timestamps: true,
    }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(String(enteredPassword),String(this.password));
}

userSchema.pre('save',async function (next){
    if(!this.isModified){
        next()
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt);
})

const User = mongoose.model("User",userSchema);

export default User