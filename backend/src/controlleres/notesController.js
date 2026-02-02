const { Note } = require("../models/Note");

const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find().sort({createdAt: -1});
        res.status(200).json(notes);
    } catch (error) {
        console.log("Error in getAllNotes controller");
        res.status(500).json({ message: "internal server eror"});
    }
}

const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: "Note not found!"});
        }
        res.status(200).json(note);
    } catch (error) {
        console.log("Error in getNoteById controller");
        res.status(500).json({ message: "internal server eror"});
    }
}

const createNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newNote = new Note({ title, content});
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.log("Error in createNote controller");
        res.status(500).json({ message: "internal server eror"});
    }
}

const updateNote = async (req, res) => {
    try {
        const { title, content } = req.body;
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {title, content}, { new: true });
        if (!updatedNote) {
           return res.status(404).json({message: "note not found"}); 
        }
        res.status(200).json(updatedNote);

    } catch (error) {
        console.log("Error in updateNote controller");
        res.status(500).json({ message: "internal server eror"});
    }
}

const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({message: "note not found"});
        }
        res.status(204).json({message: `succesfully deleted note with id ${req.params.id}`});
    } catch (error) {
        console.log("Error in deleteNote controller");
        res.status(500).json({ message: "internal server errorr"});
    }
}

module.exports = {
    getAllNotes,
    getNoteById,
    createNote,
    updateNote,
    deleteNote
}