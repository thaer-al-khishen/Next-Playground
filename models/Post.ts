import mongoose, { Document, Model } from 'mongoose';

export interface IPost extends Document {
    name: string;
    description: string;
}

const PostSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
});

// Create and export the model
const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema);
export default Post;
