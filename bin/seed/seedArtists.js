require("./../configs/mongo");

const ArtistModel = require("./../models/Artist.Model");

async function seedArtists() {
    try {
      await ArtistModel.deleteMany();
      await ArtistModel.insertMany(artists);
      console.log("done");
    } catch (err) {
      console.error(err);
    }
  }
  
  seedArtists();