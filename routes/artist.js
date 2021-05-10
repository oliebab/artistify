const express = require('express');
const ArtistModel = require('./../model/artist');
const router = express.Router();
const uploader = require("./../config/cloudinary");

router.get("/", async (req, res, next) => {
    try {
      const artists = await ArtistModel.find();
      res.render("dashboard/artists/artists.hbs", { 
        artists,
      });
    } catch (dbErr) {
      next(dbErr);
    }
  });
  
  router.get('/create', (req, res, next) => {
    res.render("dashboard/artists/artistCreate.hbs");
  });
  

  router.post('/create', uploader.single("picture"), (req, res, next) => {
    const { name, description, isBand } = req.body;
    ArtistModel.create({ picture:req.file.path, name, description, isBand })
      .then((dbResult) => {
        console.log(dbResult);
        res.redirect("/dashboard/artist");
      })
      .catch((dbError) => next(dbError));
  });
  
  router.get('/update/:id', (req, res, next) => {
    const { id } = req.params;
    ArtistModel.findById(id)
      .then((dbResult) => {
        console.log(dbResult);
        res.render("dashboard/artists/artistUpdate.hbs", {
          artist: dbResult,
        });
      })
      .catch((dbErr) => next(dbErr));
  });
  
  router.post('/update/:id', (req, res, next) => {
    const { id } = req.params;
    const { picture, name, description, isBand } = req.body;
    ArtistModel.findByIdAndUpdate(id,  { picture, name, description, isBand })
      .then((dbResult) => {
        console.log(dbResult);
        res.redirect("/dashboard/artist");
      })
      .catch((dbErr) => next(dbErr));
  });
  
  router.post('/delete/:id', (req, res, next) => {
    const { id } = req.params;
    ArtistModel.findByIdAndDelete(id)
      .then((dbSuccess) => {
        console.log(dbSuccess);
        res.redirect("/dashboard/artist");
      })
      .catch((dbErr) => {
        next(dbErr);
      });
  });
  
  module.exports = router;