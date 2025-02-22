// routes/index.js
const express = require("express");
const router = express.Router();
const LabelModel = require("./../model/Label");
const uploader = require("./../config/cloudinary");

/* GET home page. */
router.get("/", function (req, res, next) {
  // find all labels in db
  LabelModel.find()
    .then((dbResult) => {
      // send all labels to the render function
      res.render("dashboard/labels/labels.hbs", { labels: dbResult });
    })
    .catch((dbErr) => next(dbErr));
});

router.get("/create", (req, res) => {
  res.render("dashboard/labels/labelCreate.hbs");
});

router.post("/create", uploader.single("logo"), (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  // res.send("ici")
  // let label=req.body;
  // label.logo=req.file.path;
  // Const {logo:req.file.path}
  const { name, country, city, street, streetNumber, zipcode } = req.body;

  /*LabelModel.create({
    logo: req.file.path,
    ...req.body  // req.body ne prend pas en compte <input type="file" name="logo"> et c'est l'enctype qui sert à traiter les input de ce type
  })*/

  LabelModel.create({
    logo: req.file.path,
    name,
    country,
    city,
    street,
    streetNumber,
    zipcode,
  })
    .then((dbResult) => {
      res.redirect("/dashboard/label");
    })
    .catch((dbError) => next(dbError));
});

router.get("/update/:id", (req, res, next) => {
  LabelModel.findById(req.params.id)
    .then((dbResult) => {
      res.render("dashboard/labels/labelUpdate.hbs", {
        label: dbResult,
      });
    })
    .catch((dbErr) => next(dbErr));
});

router.post("/update/:id", uploader.single("logo"), (req, res, next) => {
  const { logo, name, country, city, street, streetNumber, zipcode } = req.body;

  LabelModel.findByIdAndUpdate(req.params.id, {
    logo: req.file.path,
    name,
    country,
    city,
    street,
    streetNumber,
    zipcode,
  })
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
