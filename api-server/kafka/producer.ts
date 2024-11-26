import { Kafka } from "kafkajs";

import { TOPIC } from "./constants";
import { SongDTO } from "../shared/Dto/SongDTO";

const kafkaConnection = process.env.KAFKA_CONNECTION || "redpanda:9092";
const kafka = new Kafka({
  clientId: "producer",
  brokers: [kafkaConnection],
});

const producer = kafka.producer();

export async function createInsertJob(uuid: string, songData: SongDTO) {
  const { songName, artist, release_date, length, popularity, danceability } =
    songData;
  try {
    await producer.connect();
    await producer.send({
      topic: TOPIC,
      messages: [
        {
          value: JSON.stringify({
            insertJobId: uuid,
            name: songName,
            artist,
            release_date,
            length,
            popularity,
            danceability,
          }),
        },
      ],
    });
  } catch (error) {
    console.error("Error:", error);
  }
  await producer.disconnect();
}

export async function disconnect() {
  try {
    await producer.disconnect();
  } catch (error) {
    console.error("Error:", error);
  }
}
