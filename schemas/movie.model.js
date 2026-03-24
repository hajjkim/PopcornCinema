const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    poster: { type: String, default: "" },
    genre: { type: String, default: "" },
    status: {
      type: String,
      enum: ["now_showing", "coming_soon"],
      default: "coming_soon"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Movie", movieSchema);