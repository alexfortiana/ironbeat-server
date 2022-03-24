const { Schema, model } = require("mongoose");

const songSchema = new Schema(
    {
      title: {
        type: String,
      },
      imgSong:{
        type: String,
        default: "https://res.cloudinary.com/alexfurty/image/upload/v1648069475/photos-gallery/jq5j8ibdeqyzf6k0xzqk.png"
      } ,
      price: Number,
      audioUrl: String,
      plays: {
        type: Number,
        default: 0,
      },
      owner: {
          type: Schema.Types.ObjectId,
          ref: "User"
      } 
    },
    {
      
      timestamps: true,
    }
  );






const Song = model("Song", songSchema);

module.exports = Song;