const express = require('express');

const router = express.Router();
const { getAllNotes, createNote, updateNote, deleteNote, getNoteById } = require('../controlleres/notesController');

router.get("/", getAllNotes);

router.get("/:id", getNoteById);

router.post("/", createNote);

router.put("/:id", updateNote);

router.delete("/:id", deleteNote);

module.exports = router;