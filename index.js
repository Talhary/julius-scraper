import express from "express";
import "express-async-errors";
import "dotenv/config";
const app = express();
const port = process.env?.PORT || 5000;
app.get("/", async (req, res) => {
  try {
    console.log(req.headers);
    if (req.headers?.host !== "3fdhtd-5000.csb.app")
      return res.json({ msg: "invalid headers" }).status(400);

    // console.log({ body: req.body, params: req.params, query: req.query });

    res.json({ msg: "all is well" }).status(200);
  } catch (err) {
    console.error(err);
    res.json({ msg: "something went wrong" }).status(500);
  }
});

import "./libs/telegram-bot.js";

const start = async () => {
  try {
    app.listen(port);
    console.log(`server is listening on port : http://localhost:${port}`);
  } catch (error) {}
};
start();
