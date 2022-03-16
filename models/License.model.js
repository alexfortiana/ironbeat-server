const { Schema, model } = require("mongoose");

const licenseSchema = new Schema(
    {
      purchasedPrice: {
        type: Number,
      },
      owner: {
        type: Schema.Types.ObjectId,
        ref:"User"
    },
      song:{
        type: Schema.Types.ObjectId,
        ref:"Song"
    }
      
    },
    {
      
      timestamps: true,
    }
  );






const License = model("License", licenseSchema);

module.exports = License;