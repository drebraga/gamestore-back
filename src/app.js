import express from "express";
import cors from "cors";
import catalogRouter from "./routes/catalogRoutes.js"
import authRouter from "./routes/authRoutes.js";
import cartRouter from "./routes/cartRoutes.js";
import checkoutRouter from "./routes/checkoutRoutes.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use([authRouter, catalogRouter, cartRouter, checkoutRouter]);

app.listen(process.env.PORT, () => {
    console.log(`Servidor aberto na porta ${process.env.PORT}`);
});