import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";

import songsRouter from "./routes/songRouter";
import jobStatusRouter from "./routes/jobStatusRouter";
import * as Producer from "./kafka/producer";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const port: number | string = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`api-server listening on port ${port}`);
});
app.use(cors());
app.use(bodyParser.json());

app.use("/song", songsRouter);
app.use("/insertJobStatus", jobStatusRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("api server works!");
});

process.on("SIGINT", async () => {
  console.log("Closing app...");
  try {
    await Producer.disconnect();
  } catch (error) {
    console.error("Error during cleanup:", error);
    process.exit(1);
  } finally {
    console.log("Cleanup finished. Exiting");
    process.exit(0);
  }
});
