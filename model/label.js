const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const labelSchema = new Schema({
    name: String,
    city: String,
    country: String,
    street: String,
    streetNumber: Number,
    zipcode: String,
    logo: {type: String, default: "https://cdn6.aptoide.com/imgs/1/4/c/14c166cc3cd2cac8da4809024ba82d0e_icon.png"}
});

const LabelModel = mongoose.model("labels", labelSchema);

module.exports = LabelModel;