import { songs_db_pool } from "../database/dbConfig";
import { insertSong } from "../services/insertSongService";
import { MessageDataDTO } from "../shared/Dto/MessageDataDTO";
import { SongDTO } from "../shared/Dto/SongDTO";
import { StatusCode, TOPIC } from "../lambda/constants";

import { Kafka } from "kafkajs";
const kafkaConnection = process.env.KAFKA_CONNECTION || "redpanda:9092";

const kafka = new Kafka({
  clientId: "consumer",
  brokers: [kafkaConnection],
});

const consumer = kafka.consumer({ groupId: "insert-songs-group" });

export async function connect() {
  try {
    await consumer.connect();
    await consumer.subscribe({ topic: TOPIC, fromBeginning: true });

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const data: MessageDataDTO = JSON.parse(message.value!.toString());
        const { insertJobId, ...rest } = data;
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
      },
    });
  } catch (error) {
    console.error("Error:", error);
  }
}
export async function disconnect() {
  try {
    await consumer.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}
