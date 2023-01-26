import db from "../config/database.js";
import { userSchema } from "../schema/userSchema.js";

export async function signUpValidation(req, res, next) {
  const user = req.body;
  const { error } = userSchema.validate(user, { abortEarly: false });

  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(400).send(errors);
  }

  const findCustomer = await db
    .collection("users")
    .findOne({ email: user.email });
  if (findCustomer) {
    return res.status(409).send({ message: "User already exists!" });
  }

  next();
}
