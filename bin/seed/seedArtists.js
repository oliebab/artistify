require("../../config/mongo");

const ArtistModel = require("../../model/artist");

const artists = [{
    picture: "https://img.20mn.fr/C-TazmNERm-NAnw5JqNl2w/768x492_celine-dion-concert-londres-5-juillet-2019.jpg",
    name: "Melisa & olivier",
    description: "The best singer in the world",
    band: true,
}]

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

