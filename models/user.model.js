import mongoose from "mongoose";

// schema

const userSchema = new mongoose.Schema({
    email:{
        type : String,
        unique: [true,"Email must be unique"],
        require: [true,"email is required"],
        trim: true,
        match:[/^\S+@\S+\.\S+$/,"Please enter valid email"],
    },
    password:{
        type:String,
        required : true,
        min:[8,"password is less than 8 character"],
        max: [32,"password is more than 20 characters"],
        match: [/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?]).{8,32}$/,"password is not valid"],
    },
    role:{
        type: String,
        required: true,
        enum:["admin","user"],
        default:"user",
    }
    },
    {
    timestamps:true,
    }
);

export default mongoose.model("User",userSchema);
