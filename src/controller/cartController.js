import db from "../config/database.js";
import { ObjectId } from "mongodb";

export const addToCart = async (req, res) => {
    const { gameId } = req.body;
    const userId = res.locals.userId;

    try {
        const game = await db.collection("catalog").findOne({ _id: ObjectId(gameId) });

        if (!game) return res.status(400).send("Game not found in catalog.");

        const cart = await db.collection("cart").findOne({
            userId: ObjectId(userId)
        })

        if (!cart) return res.status(400).send("User cart not found. contact the support.");

        const cartGame = await db.collection("cart").findOne({
            _id: userId,
            cart: { $elemMatch: { _id: gameId } }
        })

        if (!cartGame) return res.status(400).send("The game is already in the cart.");

        await db.collection("cart").updateOne(
            {
                userId: ObjectId(userId)
            },
            {
                $push: {
                    cart: {
                        $each: [{
                            image: game.image,
                            name: game.name,
                            price: game.price,
                            _id: game._id,
                            qty: 1
                        }],
                        $position: 0
                    }
                }
            }
        );

        return res.status(201).send("Adicionado")
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export const getCart = async (req, res) => {
    const userId = res.locals.userId;

    try {
        const userCart = await db.collection("cart").find({ _id: ObjectId(userId) }).toArray();
        return res.status(200).send(userCart);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export const updateCart = async (req, res) => {
    
}

export const deleteCart = async (req, res) => {
    const userId = res.locals.userId;

    try {

        const cart = await db.collection("cart").findOne({
            userId: ObjectId(userId)
        })

        if (!cart) return res.status(400).send("User cart not found. contact the support.");

        await db.collection("cart").updateOne(
            {
                userId: ObjectId(userId)
            },
            {
                $set: {cart: []}
            }            
        );
        return res.status(200).send("Cart content successfully deleted");
    } catch (err) {
        return res.status(500).send(err.message);
    }
}