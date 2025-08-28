import mongoose from "mongoose";

//1. Create a Schema
//2. model basedoff of that Schema

const noteSchema = mongoose.Schema({ 
    title:{ 
        type: String,
        required: true
    },
    content:{ 
        type: String,
        required: true
    },
    userId: { type:mongoose.Schema.Types.ObjectId, ref:"user", required: true }, //store the note owner
},
{ timestamps: true } //createdAt and updatedAt
)

const Note = mongoose.model("Note", noteSchema);

export default Note;