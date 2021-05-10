const express = require('express');
const ArtistModel = require('./../model/artist');
const router = express.Router();
const uploader = require("./../config/cloudinary");

router.get("/", async (req, res, next) => {
    try {
      const artists = await ArtistModel.find();
      res.render("dashboard/artists.hbs", { 
        artists,
      });
    } catch (dbErr) {
      next(dbErr);
    }
  });
  
  router.get('/create', uploader.single("logo"), (req, res, next) => {
    // Iteration #3: Add a new drone
    res.render("dashboard/artistCreate.hbs");
  });
  
  router.post('/create', (req, res, next) => {
    // Iteration #3: Add a new drone
    console.log(req.body); // will contain the posted informations
    ArtistModel.create(req.body)
      .then((dbResult) => {
        console.log(dbResult);
        res.redirect("/dashboard/artist");
      })
      .catch((dbError) => next(dbError));
  });
  
  router.get('/update/:id', (req, res, next) => {
    // Iteration #4: Update the drone
    ArtistModel.findById(req.params.id)
      .then((dbResult) => {
        console.log(dbResult);
        res.render("dashboard/artistUpdate.hbs", {
          artist: dbResult,
        });
      })
      .catch((dbErr) => next(dbErr));
  });
  
  router.post('/update/:id', (req, res, next) => {
    // Iteration #4: Update the drone
    ArtistModel.findByIdAndUpdate(req.params.id, req.body)
      .then((dbResult) => {
        console.log(dbResult);
        res.redirect("/dashboard/artist");
      })
      .catch((dbErr) => next(dbErr));
  });
  
  router.get('/delete/:id', (req, res, next) => {
    // Iteration #5: Delete the drone
    ArtistModel.findByIdAndDelete(req.params.id)
      .then((dbSuccess) => {
        console.log(dbSuccess);
        res.redirect("/dashboard/artist");
      })
      .catch((dbErr) => {
        next(dbErr);
      });
  });
  
  module.exports = router;