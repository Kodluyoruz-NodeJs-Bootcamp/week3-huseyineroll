import express from "express";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import cookieParser from "cookie-parser";
import { requireAuth, checkUser } from "./middleware/authMiddleware";

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://hsyn:Huseyin656@cluster0.njul4.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/cocktail", requireAuth, (req, res) => res.render("cocktail"));
app.use(authRoutes);
