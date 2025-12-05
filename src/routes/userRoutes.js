import { Router } from 'express';
import { authenticate } from '../middleware/authenticate.js';
import { updateUserAvatar } from '../controllers/authController.js';
import { upload } from "../middleware/multer.js";

const router = Router();

router.patch('/users/me/avatar', authenticate, updateUserAvatar, upload.single("avatar"), updateUserAvatar);

export default router;
