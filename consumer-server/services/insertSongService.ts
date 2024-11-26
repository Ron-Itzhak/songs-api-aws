import { error, log } from "console";
import { songs_db_pool } from "../database/dbConfig";
import { titleCaseSentence } from "../utils/utils";
import { getInsertJobStatusDTO } from "../shared/Dto/AnswerJobDTO";
import { SongDTO } from "../shared/Dto/SongDTO";

async function checkDuplicate(name: string, artist: string) {
  const searchQuery = {
    text: `SELECT 1 FROM songs WHERE LOWER(name) = LOWER($1) AND LOWER(artist) = LOWER($2)`,
    values: [name, artist],
  };

  try {
    const res = await songs_db_pool.query(searchQuery);
    return res.rowCount && res.rowCount > 0;
  } catch (error) {
    console.error(error);
  }
}

export async function insertSong(
  songData: SongDTO
): Promise<getInsertJobStatusDTO> {
  const { name, artist, release_date, length, popularity, danceability } =
    songData;
  const result: getInsertJobStatusDTO = {
    success: false,
  };
  const capitlizedName = titleCaseSentence(name);
  const capitlizedArtist = titleCaseSentence(artist);

  try {
    // const isDuplicate = await checkDuplicate(capitlizedName, capitlizedArtist);
    // if (isDuplicate) {
    //   result.error = "Duplicate entry was found";
    //   return result;
    // }

    const insertQuery = {
      text: `INSERT INTO songs (name, artist, release_date, length, popularity,danceability) VALUES ($1, $2, $3, $4, $5, $6)`,
      values: [
        capitlizedName,
        capitlizedArtist,
        release_date,
        length,
        popularity,
        danceability,
      ],
    };

    const querySent = await songs_db_pool.query(insertQuery);

    result.success = true;
    return result;
  } catch (error) {
    console.log("Error inserting song", error);
    result.error = "Duplicate entry was found";
    return result;
  }
}
