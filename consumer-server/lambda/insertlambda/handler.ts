import { SNSEvent, SQSEvent } from "aws-lambda";
import { SongDTO } from "../../shared/Dto/SongDTO";
import { insertSong } from "../../services/insertSongService";
import { MessageDataDTO } from "../../shared/Dto/MessageDataDTO";
import { StatusCode } from "../constants";
import { songs_db_pool } from "../../database/dbConfig";

export const insertSongLambda = async (event: SQSEvent) => {
  const sqsEventBody = JSON.parse(event.Records[0].body);
  const bodyMessage = JSON.parse(sqsEventBody.Message);

  try {
    const data: MessageDataDTO = bodyMessage;
    const { insertJobId, type, ...rest } = data;
    const result = await insertSong(rest);
    const insertQuery = {
      text: "INSERT INTO insert_song_jobs (insert_job_id,status,info) VALUES ($1, $2, $3)",
      values: [insertJobId],
    };
    if (result.success) {
      insertQuery.values.push(StatusCode.DONE, "Inserted successfully");
      await songs_db_pool.query(insertQuery);
    } else {
      insertQuery.values.push(StatusCode.FAILED, result.error!);
      await songs_db_pool.query(insertQuery);
    }

    return {
      statusCode: 200,
      body: { data, resSuccess: result.success },
    };
  } catch (e) {
    console.log(e);
  }
};
