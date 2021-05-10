// routes/index.js
const express = require("express");
const router = express.Router();
const LabelModel = require("./../model/Label");
const uploader = require("./../config/cloudinary")


/* GET home page. */
router.get("/", function (req, res, next) {
    // find all labels in db
    LabelModel.find()
      .then((dbResult) => {
        // send all labels to the render function
        res.render("dashboard/labels.hbs", { labels: dbResult });
      })
      .catch((dbErr) => next(dbErr));
  });
  
  router.get("/create", (req, res) => {
    res.render("dashboard/labelCreate.hbs");
  });
  
  
  router.get("/update/:id", (req, res) => {
    LabelModel.findById(req.params.id)
      .then((dbResult) => {
        res.render("dashboard/labelUpdate.hbs", {
          label: dbResult,
        });
      })
      .catch((dbErr) => next(dbErr));
  });
  
  
  
  router.post("/create", uploader.single("logo"), (req, res, next) => {
    console.log(req.file);
    console.log(req.body);
    // res.send("ici")
    // let label=req.body;
    // label.logo=req.file.path;
          const {logo=req.file.path,
            name,
            country,
            city,
            street,
            streetNumber,
            zipcode} = req.body;

    LabelModel.create({label:{logo=req.file.path,
        name,
        country,
        city,
        street,
        streetNumber,
        zipcode}})
    .then((dbResult) => {   
        res.redirect("/dashboard/label");
      })
      .catch((dbError) => next(dbError));
  });

  router.post("/:id", (req, res, next) => {

    LabelModel.findByIdAndUpdate(req.params.id, req.body)
      .then((dbResult) => {
        res.redirect("/dashboard/label");
      })
      .catch((dbError) => next(dbError));
  });
  
  router.get("/delete/:id", async (req, res) => {

    LabelModel.findByIdAndDelete(req.params.id)
      .then((dbSuccess) => {
        res.redirect("/dashboard/label");
      })
      .catch((dbErr) => {
        next(dbErr);
      });
  });
  
  module.exports = router;