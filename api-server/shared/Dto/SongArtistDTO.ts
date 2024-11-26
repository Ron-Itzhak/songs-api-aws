import { IsNotEmpty, IsOptional, IsString, ValidateIf } from "class-validator";

export class songNameArtistDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  artist: string;

  @IsString()
  @IsNotEmpty()
  songName: string;
}
