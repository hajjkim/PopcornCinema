const express = require("express");
const router = express.Router();
const MovieModel = require("../models/movie.model");

router.get("/", async (req, res) => {
  try {
    const movies = await MovieModel.getAllMovies();

    res.render("movie", {
      title: "Phim",
      movies
    });
  } catch (error) {
    console.error("Lỗi lấy phim ngoài user:", error);
    res.status(500).send("Lỗi server");
  }
});

module.exports = router;