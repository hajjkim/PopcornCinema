const express = require("express");
const router = express.Router();
const UserModel = require("../models/user.model");
const { requireLogin } = require("../middlewares/auth.middleware");

router.get("/profile", requireLogin, async (req, res) => {
  try {
    const userId = req.session.user.id;
    const user = await UserModel.getProfileById(userId);

    if (!user) {
      return res.status(404).send("Không tìm thấy thông tin người dùng");
    }

    res.render("user/profile", {
      title: "Thông tin cá nhân",
      user
    });
  } catch (error) {
    console.error("Lỗi lấy thông tin cá nhân:", error);
    res.status(500).send("Lỗi server");
  }
});

module.exports = router;