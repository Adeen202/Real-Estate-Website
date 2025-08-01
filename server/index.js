import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { userRoute } from './routes/userRoute.js';
import { residencyRoute } from './routes/residencyRoute.js';
dotenv.config()

const app = express();

const PORT = process.env.PORT || 7000;

app.use(express.json())
app.use(cors())
app.use(cookieParser())



app.use('/api/user', userRoute);
app.use('/api/residency', residencyRoute);
app.get("/test", (req, res) => {
    res.send("✅ API is working");
});

app.listen(PORT, () => {
    console.log(`server on port ${PORT}`);
});