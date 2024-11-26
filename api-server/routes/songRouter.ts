import { songNameArtistDTO } from "../shared/Dto/SongArtistDTO";
import * as songController from "../controllers/songController";
import { SongDTO } from "../shared/Dto/SongDTO";
import { validateDto } from "../middlewares/validationMiddleware";
const express = require("express");

const router = express.Router();

router.get("/", validateDto(songNameArtistDTO), songController.getSong);
router.post("/", validateDto(SongDTO), songController.postInsertSong);
export default router;
