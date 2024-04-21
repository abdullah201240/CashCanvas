import mongoose, { Document, Model, Schema } from 'mongoose';

interface UserDocument extends Document {
    name: string;
    phone: string;
    email: string;
    password: string;
    address: string;
    nid: string;
    photo: string;
}

const userSchema = new Schema<UserDocument>({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    nid: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "photo"
    }
}, { timestamps: true });

const User: Model<UserDocument> = mongoose.model('User', userSchema);

export default User;
