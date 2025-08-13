import express from 'express';
import {getAllNotes, getNotesById, createANote, updateNote, deleteNote } from '../controllers/notesControllers.js'

const router = express.Router();

router.get("/", getAllNotes);
router.get("/:id", getNotesById);
router.post("/", createANote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;