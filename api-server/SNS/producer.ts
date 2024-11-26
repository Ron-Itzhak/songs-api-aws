import { SongDTO } from "../shared/Dto/SongDTO";
import { snsClient } from "./snsClient";

import { PublishCommand } from "@aws-sdk/client-sns";

export async function createInsertJob(uuid: string, songData: SongDTO) {
  const { songName, artist, release_date, length, popularity, danceability } =
    songData;

  const message = {
    type: "AddSong",
    insertJobId: uuid,
    name: songName,
    artist,
    release_date,
    length,
    popularity,
    danceability,
  };

  const params = {
    Message: JSON.stringify(message),
    TopicArn: "arn:aws:sns:eu-central-1:592041974036:AddSong",
    ///added
    MessageAttributes: {
      event_type: {
        DataType: "String",
        StringValue: "AddSong",
      },
    },
  };

  try {
    const data = await snsClient.send(new PublishCommand(params));
    console.log("Success", data);
    return data; // For unit tests.
  } catch (err) {
    console.log("Error", err);
  }
}
