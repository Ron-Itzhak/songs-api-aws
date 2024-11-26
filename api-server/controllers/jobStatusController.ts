import { Request, Response } from "express";
import { songs_db_pool } from "../database/dbConfig";

export const getInsertJobStatus = async (req: Request, res: Response) => {
  const { jobId } = req.query;
  try {
    const searchQuery = {
      text: `SELECT * FROM insert_song_jobs Where insert_job_id = $1`,
      values: [jobId],
    };

    const result = await songs_db_pool.query(searchQuery);
    if (result.rowCount && result.rowCount > 0) {
      res.status(200).json(...result.rows);
    } else {
      const concatenatedString = `Job: ${jobId} was not found`;
      res.status(404).json(concatenatedString);
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("error in getting job Status");
  }
};
