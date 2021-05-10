const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const artistSchema = new Schema({
  picture: String,
  name: String,
  description: String,
  band: Boolean,
});

const ArtistModel = mongoose.model("artists", artistSchema);

module.exports = ArtistModel;