import express from "express";
import { check, validationResult } from "express-validator";
const router = express.Router();
import config from "config";
import multer from "multer";
import path from "path";
import fs from 'fs'
import paper from "../../models/Paper.js";
import auth from "../../middleware/auth.js";

const pdfPath = '../../public/files/papers-With all these features.pdf-1639201357155.pdf'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `files/papers-${file.originalname}-${Date.now()}.${ext}`);
    console.log(file);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10000000 },
}).any();

router.post("/", auth, async (req, res) => {
  upload(req, res, async () => {
    const { paperName, imf, authorType, date } = req.body;
    const user = req.user.id;
    const file = new paper({
      user,
      paperName,
      imf,
      authorType,
      date,
      file_data: req.files[0],
    });
    await file.save();
    res.send("Upload Sucessful");
  });
});
router.get("/", async (req, res) => {
  try {
    let { from, to, imf, authorType } = req.query;
    !from && (from = "01-01-1999");
    !imf && (imf = 0);
    !authorType && (authorType = "student");
    !to && (to = "01-01-2050");
    const fetchedPapers = await paper.find({
      imf: {
        $gte: imf,
      },
      authorType: authorType,
      date: {
        $gte: new Date(from),
        $lte: new Date(to),
      },
    });
    res.send(fetchedPapers);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/getmypapers", auth, async (req, res) => {
  try {
    const myPapers = await paper.find({
      user: req.user.id,
    });
    res.send(myPapers);
  } catch (error) {
    console.log(error.message);
  }
});

router.get("/displaypaper", auth, async (req, res) => {
  try {
    const file = fs.createReadStream("../../public/files/paper.pdf")
    file.pipe(res)
  } catch (error) {
    console.log(error.message);
  }
});

export default router;

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyUmVnaXN0ZXIiOnsiaWQiOiI2MWIzNTAzNzY1ZDBiOTA1M2U4OWUyZmYifSwiaWF0IjoxNjM5MTQ2MDI4LCJleHAiOjE2MzkxNDc4Mjh9.VdF4ONRyalxRpq5vNGe4AYH9MvSWYi4crK6yYDy4TQc
