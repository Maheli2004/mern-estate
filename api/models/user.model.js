import mongoose from "mongoose";
import { type } from "os";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,
        default: "https://static.vecteezy.com/system/resources/previews/026/619/142/non_2x/default-avatar-profile-icon-of-social-media-user-photo-image-vector.jpg"
    },

}, {timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;