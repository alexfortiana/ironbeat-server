const { Schema, model } = require("mongoose");

const messageSchema = new Schema(
    {
      text: {
        type: String,
      },
      from: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
      to:{
        type: Schema.Types.ObjectId,
        ref:"User"
    }
      
    },
    {
      
      timestamps: true,
    }
  );






const Message = model("Message", messageSchema);

module.exports = Message;