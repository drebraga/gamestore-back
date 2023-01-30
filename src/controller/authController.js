import bcrypt, { compareSync } from "bcrypt";
import { v4 as uuid } from "uuid";
import db from "../config/database.js";

export const autoSignIn = async (req, res) => {
  const id = res.locals.userId;

  try {
    const { token, userId } = await db
      .collection("sessions")
      .findOne({ userId: id });
    const { name } = await db.collection("users").findOne({ _id: userId });
    const response = { token: token, name: name };

    return token ? res.status(202).send(response) : res.sendStatus(401);
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

export async function signUp(req, res) {
  const user = req.body;

  try {
    const passwordHash = bcrypt.hashSync(user.password, 10);

    delete user.repeatPassword;

    const { insertedId } = await db.collection("users").insertOne({
      ...user,
      password: passwordHash,
    });

    await db.collection("cart").insertOne({
      userId: insertedId,
      cart: [],
    });

    res.status(201).send({ message: "user created successfully!" });
  } catch (error) {
    res.status(500).send(error.message);
  }
}

export async function signIn(req, res) {
  const { email, password } = req.body;

  try {
    const user = await db.collection("users").findOne({ email });

    if (user && compareSync(password, user.password)) {
      const token = uuid();
      const findUserToken = await db
        .collection("sessions")
        .findOne({ userId: user._id });
      if (findUserToken) {
        await db.collection("sessions").updateOne(
          { userId: user._id },
          {
            $set: {
              token,
            },
          }
        );
      } else {
        await db.collection("sessions").insertOne({
          userId: user._id,
          token,
        });
      }
      res.status(201).send({ token, name: user.name });
    } else {
      return res.status(400).send({ message: "email or password is invalid!" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
}
