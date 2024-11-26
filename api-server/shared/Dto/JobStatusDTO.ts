import { IsNotEmpty, IsString } from "class-validator";

export class getInsertJobStatusDTO {
  @IsString()
  @IsNotEmpty()
  jobId?: string;
}
