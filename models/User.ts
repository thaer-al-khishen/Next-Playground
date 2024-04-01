//models/User.ts

import mongoose, { Document } from 'mongoose';

interface IUser extends Document {
    email: string;
    password: string;
    // Define other properties here, matching your schema
}

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // Add any additional fields as necessary
}, { timestamps: true });

// Convert _id to id and remove __v when the object is serialized to JSON
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id; }
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
