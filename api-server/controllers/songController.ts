import { Request, Response } from "express";
import { songs_db_pool } from "../database/dbConfig";
import { v4 as uuidv4 } from "uuid";
import { createInsertJob } from "../SNS/producer";

export const getSong = async (req: Request, res: Response) => {
  const { songName, artist } = req.query;
  let query: string;
  const values = [];
  if (!artist) {
    query = `SELECT * FROM songs WHERE LOWER(name) = LOWER($1)`;
    values.push(songName);
  } else if (!songName) {
    query = `SELECT * FROM songs WHERE LOWER(artist) = LOWER($1)`;
    values.push(artist);
  } else {
    query = `SELECT * FROM songs WHERE LOWER(name) = LOWER($1) AND LOWER(artist) = LOWER($2)`;
    values.push(songName, artist);
  }
  const searchQuery = {
    text: query,
    values,
  };

  try {
    const result = await songs_db_pool.query(searchQuery);
    if (result.rowCount && result.rowCount > 0) {
      res.status(200).json(result.rows);
    } else {
      const concatenatedString = `not found Song: ${songName} by artist: ${artist};`;
      res.status(400).json(concatenatedString);
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("error in getting song ");
  }
};

export const postInsertSong = async (req: Request, res: Response) => {
  const { songName, artist, release_date, length, popularity, danceability } =
    req.body;

  try {
    const uuid = uuidv4();
    createInsertJob(uuid, {
      songName,
      artist,
      release_date,
      length,
      popularity,
      danceability,
    });
    const concatenatedString = `created InsertJob Song: ${songName} by Artist: ${artist};`;
    res.status(200).send({ jobId: uuid, message: concatenatedString });
  } catch (error) {
    console.error(error);
    res.status(500).send("error in creating InsertJob");
  }
};
