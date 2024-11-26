import express, { Router, Request, Response } from "express";
import { faker } from "@faker-js/faker";

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`lyrics-server is running on port:${PORT}`);
});

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}
const cache: { [key: string]: string } = {};

app.get("/lyrics", (req: Request, res: Response) => {
  const songName = req.query.songName as string;

  if (!songName) {
    return res.status(500).send("Song name cannot be empty!");
  }
  if (cache[songName]) {
    return res.status(200).send(cache[songName]);
  }
  const lyrics = faker.lorem.paragraphs(getRandomNumber(2, 10));
  const concatenatedString = `${songName}:\n\n${lyrics};`;
  cache[songName] = concatenatedString;

  res.status(200).send(concatenatedString);
});
