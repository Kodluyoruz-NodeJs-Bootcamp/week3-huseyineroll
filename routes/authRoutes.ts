import { Router } from "express";
import { login, register } from "../controller/authController";
import { clearCookie, redirect, render } from "./helpers";
const router = Router();

router.get("/login", render("login"));
router.get("/signup", render("signup"));
router.get("/logout", clearCookie, redirect("/"));

router.post("/login", login);
router.post("/signup", register);


const authRoutes = router;
export default authRoutes;