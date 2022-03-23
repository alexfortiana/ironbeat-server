const { Schema, model } = require("mongoose");

const songSchema = new Schema(
    {
      title: {
        type: String,
      },
      imgSong: String,
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