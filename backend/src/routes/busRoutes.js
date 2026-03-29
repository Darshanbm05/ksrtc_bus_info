import express from "express";
import {getBuses,getPlaces,getFrom} from "../controllers/busController.js";

const router=express.Router();

router.get("/",getBuses);
router.get("/places",getPlaces);
router.get("/from",getFrom);

export default router;