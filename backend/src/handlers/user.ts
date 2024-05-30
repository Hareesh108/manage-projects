import prisma from "../db";
import { comparePasswords, createJWT, hashPassword } from "../modules/auth";

export const createUser = async (req, res, next) => {
  try {
    const user = await prisma.user.create({
      data: {
        username: req.body.username,
        password: await hashPassword(req.body.password),
      },
    });

    const token = createJWT(user);
    res.json({ token: token });
  } catch (err) {
    err.type = "input";
    next(err);
  }
};

export const signin = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        username: req.body.username,
      },
    });
    const isValid = await comparePasswords(req.body.password, user.password);

    if (!isValid) {
      res.status(401);
      res.json({ message: "Enter a valid password" });
    }

    const token = createJWT(user);
    res.status(200);
    res.json({ token });
  } catch (err) {
    console.log(err, "err");
    res.status(400);
    res.json({ message: "Bad Credential" });
  }
};
