import cors from "cors";
import express from "express";
import morgon from "morgan";
import { createUser, signin } from "./handlers/user";
import { protect } from "./modules/auth";
import router from "./router";

const app = express();

app.use(cors());
app.use(morgon("dev"));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/user", createUser);
app.post("/signin", signin);

app.use("/api", protect, router);




















// synchronous error handle
app.get("/synch", (req, res) => {
  throw new Error("synch error");
});

// asynchronous error handle
app.get("/asynch", (req, res, next) => {
  setTimeout(() => next(new Error("asynch error")), 5000);
});

app.get("/", (req, res, next) => {
  res.json({ message: "Hello" });
});



app.use((err, req, res, next) => {
  if (err.type === "auth") {
    res.status(401).json({ message: "unauthorised" });
  } else if (err.type === "input") {
    res.status(400).json({ message: "Invalid input" });
  } else {
    res.status(500).json({ message: "Internal server error" });
  }
});

export default app;
