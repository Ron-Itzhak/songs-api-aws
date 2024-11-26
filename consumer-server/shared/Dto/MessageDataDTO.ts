import { SongDTO } from "./SongDTO";

export interface MessageDataDTO extends SongDTO {
  insertJobId: string;
  type: string;
}
