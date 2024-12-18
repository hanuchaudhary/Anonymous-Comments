import mongoose, { Document, Schema } from "mongoose"

export interface Message extends Document {
    content: string;
    createdAt: Date;
}
const MessageSchema: Schema<Message> = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
})

export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[]
}
const UserSchema: Schema<User> = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    verifyCode: {
        type: String,
        required: true
    },
    verifyCodeExpiry: {
        type: Date,
        required: true
    },
    isAcceptingMessages: {
        type: Boolean,
        required: true,

    },
    isVerified: {
        type: Boolean,
        default: false
    },
    messages: [MessageSchema]
})

const userModel = (mongoose.models.User as mongoose.Model<User>) || (mongoose.model<User>("User", UserSchema))

export default userModel;