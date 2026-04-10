import mongoose from "mongoose"

const Postschema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    
    img: {
        type: String,
        default: ""
    },
    text: {
        type: String,
        required: true
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],
    comments: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
            },
            text: String,
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ],


}, { timestamps: true })

const Post = mongoose.model("Post", Postschema)

export default Post