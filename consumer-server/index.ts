import express, { Request, Response } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import * as Consumer from "./Kafka/consumer";

const app = express();
const port: number | string = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Consumer app listening on port ${port}`);
});

Consumer.connect().catch(console.error);

process.on("SIGINT", async () => {
  console.log("Closing app...");
  try {
    await Consumer.disconnect();
  } catch (err) {
    console.error("Error during cleanup:", err);
    process.exit(1);
  } finally {
    console.log("Cleanup finished. Exiting");
    process.exit(0);
  }
});
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send("Consumer works");
});
