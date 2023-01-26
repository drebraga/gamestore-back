import db from "../config/database.js";

export const getCatalog = async (req, res) => {
    try {
        const catalog = await db.collection("catalog").find().toArray();
        return res.status(200).send(catalog);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export const getGame = async (req, res) => {
    const game = req.params.search.split("_").join(" ");
    console.log(game)
    try {
        await db.collection("catalog").createIndex({
            name: "text"
        });
        const catalog = await db.collection("catalog").find({
            $text: {
                $search: game
            }
        }).toArray();
        return res.status(200).send(catalog);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export const postGame = async (req, res) => {
    const game = req.body;
    try {
        await db.collection("catalog").insertOne(game);
        return res.sendStatus(202);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}