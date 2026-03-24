// const express = require("express");
// const router = express.Router();
// const fs = require("fs");
// const path = require("path");

// function getPromotionList() {
//   const promotionDir = path.join(__dirname, "../public/images/promotions");

//   if (!fs.existsSync(promotionDir)) return [];

//   const files = fs.readdirSync(promotionDir);

//   return files
//     .filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file))
//     .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
//     .map((file, index) => {
//       const fileName = path.parse(file).name;

//       return {
//         _id: String(index + 1),
//         slug: fileName.toLowerCase(),
//         title: `Ưu đãi ${index + 1}`,
//         description: "Ưu đãi hấp dẫn dành riêng cho khách hàng tại Popcorn Cinema.",
//         image: `/images/promotions/${file}`,
//         content: [
//           "Áp dụng cho khách hàng đặt vé trực tiếp tại quầy hoặc qua hệ thống online của Popcorn Cinema.",
//           "Số lượng ưu đãi có hạn trong thời gian diễn ra chương trình.",
//           "Không áp dụng đồng thời với một số chương trình khuyến mãi khác.",
//           "Vui lòng kiểm tra điều kiện áp dụng tại rạp trước khi thanh toán."
//         ],
//         validFrom: "01/03/2026",
//         validTo: "31/03/2026"
//       };
//     });
// }

// // Danh sách ưu đãi
// router.get("/", (req, res) => {
//   try {
//     const promotions = getPromotionList();

//     res.render("promotion/index", {
//       title: "Ưu đãi",
//       promotions,
//       nowShowing: []
//     });
//   } catch (error) {
//     console.error("Lỗi tải danh sách ưu đãi:", error);
//     res.render("promotion/index", {
//       title: "Ưu đãi",
//       promotions: [],
//       nowShowing: []
//     });
//   }
// });

// // Chi tiết ưu đãi
// router.get("/:id", (req, res) => {
//   try {
//     const promotions = getPromotionList();
//     const { id } = req.params;

//     const promotion = promotions.find(
//       (item) => item._id === id || item.slug === id
//     );

//     if (!promotion) {
//       return res.status(404).render("promotion/promotion-detail", {
//         title: "Không tìm thấy ưu đãi",
//         promotion: null,
//         relatedPromotions: []
//       });
//     }

//     const relatedPromotions = promotions
//       .filter((item) => item._id !== promotion._id)
//       .slice(0, 4);

//     res.render("promotion/promotion-detail", {
//       title: promotion.title,
//       promotion,
//       relatedPromotions
//     });
//   } catch (error) {
//     console.error("Lỗi tải chi tiết ưu đãi:", error);
//     res.status(500).render("promotion/promotion-detail", {
//       title: "Chi tiết ưu đãi",
//       promotion: null,
//       relatedPromotions: []
//     });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const PromotionModel = require("../models/promotion.model");

router.get("/", async (req, res) => {
  try {
    const dbPromotions = await PromotionModel.getAllPromotions();

    const promotions = dbPromotions.map((item) => ({
      _id: String(item.id),
      title: item.title,
      image: item.poster_url || "/images/promotions/default.jpg",
      description: item.description || "Ưu đãi hấp dẫn dành cho khách hàng."
    }));

    res.render("promotion/index", {
      title: "Ưu đãi",
      promotions,
      nowShowing: []
    });
  } catch (error) {
    console.error("Lỗi load khuyến mãi:", error);
    res.render("promotion/index", {
      title: "Ưu đãi",
      promotions: [],
      nowShowing: []
    });
  }
});

module.exports = router;