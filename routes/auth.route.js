const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const UserModel = require("../models/user.model");

router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Đăng nhập",
    error: null
  });
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.render("auth/login", {
        title: "Đăng nhập",
        error: "Vui lòng nhập đầy đủ email và mật khẩu"
      });
    }

    const user = await UserModel.findUserByEmail(email);

    if (!user) {
      return res.render("auth/login", {
        title: "Đăng nhập",
        error: "Email hoặc mật khẩu không đúng"
      });
    }

    const hashedPassword = user.password || user.password_hash;

    if (!hashedPassword) {
      console.error("User không có password hash:", user);
      return res.render("auth/login", {
        title: "Đăng nhập",
        error: "Tài khoản không hợp lệ, vui lòng liên hệ quản trị viên"
      });
    }

    const isMatch = await bcrypt.compare(password, hashedPassword);

    if (!isMatch) {
      return res.render("auth/login", {
        title: "Đăng nhập",
        error: "Email hoặc mật khẩu không đúng"
      });
    }

    req.session.user = {
      id: user.id,
      fullName: user.full_name,
      email: user.email,
      role: user.role
    };

    if (user.role === "ADMIN") {
      return res.redirect("/admin/dashboard");
    }

    return res.redirect("/");
  } catch (error) {
    console.error("Lỗi login:", error);
    return res.render("auth/login", {
      title: "Đăng nhập",
      error: "Đã có lỗi xảy ra, vui lòng thử lại"
    });
  }
});

router.get("/register", (req, res) => {
  res.render("auth/register", {
    title: "Đăng ký",
    error: null
  });
});

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, confirmPassword } = req.body;

    if (password !== confirmPassword) {
      return res.render("auth/register", {
        title: "Đăng ký",
        error: "Mật khẩu xác nhận không khớp"
      });
    }

    const existingUser = await UserModel.findUserByEmail(email);

    if (existingUser) {
      return res.render("auth/register", {
        title: "Đăng ký",
        error: "Email đã tồn tại"
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await UserModel.createUser({
      fullName,
      email,
      passwordHash,
      role: "CUSTOMER"
    });

    return res.redirect("/auth/login");
  } catch (error) {
    console.error("Lỗi register chi tiết:", error);

    return res.render("auth/register", {
      title: "Đăng ký",
      error: error.message || "Đăng ký thất bại"
    });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
});

router.get("/create-admin", async (req, res) => {
  try {
    const existingUser = await UserModel.findUserByEmail("admin@gmail.com");

    if (existingUser) {
      return res.send("Admin đã tồn tại");
    }

    const passwordHash = await bcrypt.hash("123456", 10);

    await UserModel.createUser({
      fullName: "Admin",
      email: "admin@gmail.com",
      passwordHash,
      role: "ADMIN"
    });

    return res.send("Tạo admin thành công");
  } catch (err) {
    console.error("Lỗi tạo admin:", err);
    return res.status(500).send("Tạo admin thất bại");
  }
});

module.exports = router;