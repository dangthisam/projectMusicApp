import express, { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();
const app = express();
import connect from"./config/connectDB";
connect();
const port: number |string= process.env.PORT || 3000;

app.set("views", "./views");
app.set("view engine", "pug");

app.get("/topics", (req: Request, res: Response) => {
   res.render("client/pages/topics/index.pug");
});

app.listen(port, () => {
   console.log(`Server running at http://localhost:${port}`);
});