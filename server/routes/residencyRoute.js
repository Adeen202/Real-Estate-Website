import express from 'express';
import { createResidency, getAllResidencies, getResidency } from '../controllers/resdCtrl.js';
import jwtCheck from '../config/auth0Config.js';

const router = express.Router();

router.post("/create", jwtCheck, createResidency);
router.get("/residencies", getAllResidencies);
router.get("/:id", getResidency);

export { router as residencyRoute };
