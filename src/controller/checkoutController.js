import db from "../config/database.js";
import { ObjectId } from "mongodb";

export const getHistory = async (_, res) => {
    const userId = res.locals.userId;

    try {
        const history = await db.collection("checkout").findOne({ userId: userId });

        if (!history) return res.status(400).send("Contact support!");

        return res.send(history.products);
    } catch (error) {
        return res.status(500).send(err.message);
    }
}

export const addToHistory = async (req, res) => {
    const { updatedCart } = req.body;

    const userId = res.locals.userId;

    
    try {        
        const history = await db.collection("checkout").findOne({
            userId: ObjectId(userId)
        })

        if (!history) {
            await db.collection("checkout").insertOne({userId: ObjectId(userId)})
        }

        await db.collection("checkout").updateOne(
            {
                userId: ObjectId(userId)
            },
            {
                $set: {products: updatedCart}
            }            
        );

        return res.status(201).send("Checkout content successfully updated")
    } catch (err) {
        return res.status(500).send(err.message);
    }
}