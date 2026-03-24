const homeService = require("../services/home.service");

const getHomePage = async (req, res) => {
  try {
    const data = await homeService.getHomeData();

    return res.render("home", {
      title: "Popcorn Cinema",
      nowShowing: data.nowShowing,
      comingSoon: data.comingSoon,
      promotions: data.promotions
    });
  } catch (error) {
    console.error("getHomePage error:", error);
    return res.status(500).send("Lỗi server khi tải trang chủ");
  }
};

module.exports = {
  getHomePage
};