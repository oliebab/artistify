const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const styleSchema = new Schema({
    name: String,
    color: {
        type: String,
        default: "#000"
    },
    wikiURL : String
})
const StyleModel = mongoose.model("styles", styleSchema);
module.exports = StyleModel;