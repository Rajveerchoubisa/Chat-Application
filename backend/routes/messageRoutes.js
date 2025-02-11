import express from "express";

const router = express.Router();
import {sendMessage,allMessages} from '../controllers/messagecontrollers.js'
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, sendMessage);
router.route('/:chatId').get(protect,allMessages)

export default router;
