import { Router } from 'express';
import {
  getAllNotes,
  getNotesById,
  createNote,
  deleteNote,
  updateNote,
} from '../controllers/notesController.js';

export const router = Router();

router.get('/notes', getAllNotes);
router.get('/notes/:noteId', getNotesById);
router.post('/notes', createNote);
router.delete('/notes/:noteId', deleteNote);
router.patch('/notes/:noteId', updateNote);

export default router;