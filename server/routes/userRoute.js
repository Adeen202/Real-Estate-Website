import express from 'express';
import { addToFav, bookVisit, cancelBooking, createUser, getAllBookings, getAllFav } from '../controllers/userCtrl.js';
import jwtCheck from '../config/auth0Config.js';

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/bookVisit/:id", jwtCheck, bookVisit);
router.post("/allBookings", getAllBookings);
router.post("/removeBooking/:id", jwtCheck, cancelBooking)
router.post("/favourites/:rid", jwtCheck, addToFav)
router.get("/getFavourites", jwtCheck, getAllFav)
export { router as userRoute }