require("../../config/mongo");

const StyleModel = require("../../model/style");

const styles = [
    { name: "sonic youth", color: "pink", wikiURL: "http://test" },
    { name: "sonic top", color: "green", wikiURL: "http://test" },
    { name: "sonic yoyo", color: "blue", wikiURL: "http://test" },
  ];

async function seedStyles() {
    try {
      await StyleModel.deleteMany();
      await StyleModel.insertMany(styles);
      console.log("done");
    } catch (err) {
      console.error(err);
    }
  }
  
  seedStyles();