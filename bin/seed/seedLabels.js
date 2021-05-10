require("./../configs/mongo");

const LabelModel = require("../model/label");

const labels=[]

LabelModel.insertMany(labels)
  .then((dbres) => console.log("labels input"))
  .catch((err) => console.log(err));