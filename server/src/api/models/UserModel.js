import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    createdDate: {
        type: Date,
        required: true,
        default: new Date(),
    },
});

export const UserModel = mongoose.model("collections", UserSchema);
