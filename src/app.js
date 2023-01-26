import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import catalogRouter from "./routes/catalogRoutes.js"
import authRouter from "./routes/authRoutes.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use([authRouter,catalogRouter]);

app.listen(process.env.PORT, () => {
    console.log(`Servidor aberto na porta ${process.env.PORT}`);
});

