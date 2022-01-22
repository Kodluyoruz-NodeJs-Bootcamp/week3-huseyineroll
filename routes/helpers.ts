import { RequestHandler } from "express";

// View renderer
export const render =
  (view: string): RequestHandler =>
  (req, res, next) => {
    res.render(view);
  };

// Redirect
export const redirect =
  (path: string): RequestHandler =>
  (req, res, next) => {
    res.redirect(path);
  };

// Clear session cookie

export const clearCookie: RequestHandler = (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.cookie("connect.sid", "", { maxAge: 1 });
  next();
};
