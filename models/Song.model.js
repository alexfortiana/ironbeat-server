const { Schema, model } = require("mongoose");

const songSchema = new Schema(
    {
      title: {
        type: String,
      },
      imgSong: String,
      price: Number,
      audioUrl: String,
      like: [
          {
              type: Schema.Types.ObjectId,
              ref:"User"
          }
      ],
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