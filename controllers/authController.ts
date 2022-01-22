import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { RequestHandler } from "express";


const maxAge = 10 * 60;


const createToken = (id: string, browserInfo: string): string =>
  jwt.sign({ id, browserInfo }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;
  const browserInfo = req.headers["user-agent"];

  try {
    const user = await User.findOne({ email });

    const isPasswordRight = bcrypt.compare(password, user.password);

    if (isPasswordRight) {
      const token = createToken(user._id, browserInfo);

      res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
      res.status(200).json({ user: user._id });
    } else {
      res.redirect(301, "login");
    }
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};

export const register: RequestHandler = async (req, res) => {
  const { email, password, name, surname } = req.body;
  const browserInfo = req.headers["user-agent"];

  try {
    const hashedPassword = await bcrypt.hash(password, 8);

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      surname,
    });
    const token = createToken(user._id, browserInfo);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(201).json({ user: user._id });
  } catch (err) {
    res.status(400).json({ errors: err });
  }
};
