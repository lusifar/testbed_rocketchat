import axios from "axios";
import express from "express";
import { Request, Response } from "express";
import { json } from "body-parser";

const init = () => {
  const app = express();

  app.use(json());

  app.post("/api/rms", async (req: Request, res: Response) => {
    const { ROCKETCHAT_URL } = process.env;

    await axios.get(`${ROCKETCHAT_URL}/api/v1/me`, {
      headers: {
        "X-Auth-Token": req.body["authToken"],
        "X-User-Id": req.body["userId"],
      },
    });

    await new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(req.body);
      }, 3000);
    });

    res.status(200).send({ message: "rms service is completed..." });
  });

  app.listen(3030, () => {
    console.log("express is alive...");
  });
};

export { init };
