import {
  IsInt,
  IsString,
  Min,
  Max,
  IsNumber,
  IsNotEmpty,
  IsOptional,
} from "class-validator";

export class SongDTO {
  @IsString()
  @IsNotEmpty()
  songName: string;

  @IsString()
  @IsNotEmpty()
  artist: string;

  @IsInt()
  @Min(1900)
  @Max(new Date().getFullYear())
  @IsNotEmpty()
  release_date: number;

  @IsNumber()
  @IsNotEmpty()
  length: number;

  @IsInt()
  @Min(0)
  @Max(100)
  @IsNotEmpty()
  popularity: number;

  @IsNumber()
  @Min(0)
  @Max(1)
  @IsNotEmpty()
  danceability: number;
}
