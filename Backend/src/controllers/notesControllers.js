import Note from '../models/Note.js';

export async function getAllNotes(req, res) { 
    try { 
        const userId = req.user.id;  // JWT se mila
        const notes = await Note.find({ userId }).sort({ createdAt: -1 }); 
        res.status(200).json(notes);
    }
    catch(error) { 
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function getNotesById(req, res){ 
    try{ 
        const note = await Note.findById(req.params.id);
        if(!note){res.status(404).json({  message:"Note not found"})};
        res.status(200).json(note);

    }catch(error){ 
        console.log("Error in getNotesById controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}
export async function createANote(req, res) { 
    try { 
        console.log("📌 Request body:", req.body);
        console.log("📌 User from middleware:", req.user);

        const { title, content } = req.body;
        const userId = req.user.id; // JWT se aaya

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        // ✅ userId include karna hoga
        const note = new Note({ title, content, userId });

        const savedNote = await note.save();
        res.status(201).json(savedNote);

    } catch (error) { 
        console.log("Error in createNote controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function updateNote(req, res) { 
    try{ 
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: "Note not found" });
        };

        res.status(200).json({updatedNote});
    }
    catch(error){ 
        console.log("Error in updateNote controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export async function deleteNote(req, res) { 
    try{ 

        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" });
        };
        res.status(200).json({ message: "Note deleted sucessfully" });

    }catch(error){ 
        console.log("Error in deleteNote controller:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}