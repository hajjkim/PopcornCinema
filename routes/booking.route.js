// const express = require("express");
// const router = express.Router();
// const { requireAuth } = require("../middlewares/auth.middleware");
// const movies = [
//   {
//     _id: "1",
//     title: "Tài",
//     poster: "/images/movies/phim1.jpg",
//     ageRating: "T16",
//     duration: 100
//   },
//   {
//     _id: "2",
//     title: "Thỏ Ơi!!",
//     poster: "/images/movies/phim2.jpg",
//     ageRating: "T18",
//     duration: 127
//   }
// ];

// function generateSeatLayout() {
//   const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
//   const layout = [];

//   rows.forEach((row) => {
//     const seats = [];

//     if (row !== "J") {
//       for (let i = 1; i <= 14; i++) {
//         let type = "standard";
//         let status = "available";

//         if (
//           (row === "H" && (i === 8 || i === 9)) ||
//           (row === "D" && i === 3) ||
//           (row === "F" && i === 12)
//         ) {
//           status = "booked";
//         }

//         seats.push({
//           code: `${row}${i}`,
//           label: `${i}`,
//           type,
//           status
//         });
//       }
//     } else {
//       for (let i = 1; i <= 7; i++) {
//         seats.push({
//           code: `${row}${i}`,
//           label: `${i}`,
//           type: "couple",
//           status: "available"
//         });
//       }
//     }

//     layout.push({
//       row,
//       seats
//     });
//   });

//   return layout;
// }

// router.get("/showtime/:id", (req, res) => {
//   const movie = movies.find((item) => item._id === req.params.id);

//   if (!movie) {
//     return res.status(404).send("Không tìm thấy phim");
//   }

//   const cinemas = [
//     {
//       id: "cinema-1",
//       name: "Galaxy CineX - Hanoi Centre",
//       active: true
//     },
//     {
//       id: "cinema-2",
//       name: "Galaxy CineX - Long Biên",
//       active: false
//     },
//     {
//       id: "cinema-3",
//       name: "Galaxy CineX - Times City",
//       active: false
//     }
//   ];

//   const showtimes = [
//     {
//       id: "time-1",
//       value: "17:30",
//       active: false
//     },
//     {
//       id: "time-2",
//       value: "19:45",
//       active: true
//     },
//     {
//       id: "time-3",
//       value: "21:30",
//       active: false
//     }
//   ];

//   const seatLayout = generateSeatLayout();

//   router.get("/payment/:id", (req, res) => {
//   const movie = movies.find((item) => item._id === req.params.id);

//   if (!movie) {
//     return res.status(404).send("Không tìm thấy phim");
//   }

//   const promotions = [
//     { id: "promo-1", label: "Giảm 20% vé tối thứ 3", discount: 52800 },
//     { id: "promo-2", label: "Giảm 10% tổng hóa đơn", discount: 26000 },
//     { id: "promo-3", label: "Không áp dụng khuyến mãi", discount: 0 }
//   ];

//   const bookingInfo = {
//     cinema: "Popcorn Cinema - SC VivoCity",
//     room: "Phòng 2",
//     showtime: "19:00 18/03/2026",
//     seats: ["I8", "I9"],
//     ticketTotal: 180000,
//     comboTotal: 84000,
//     discount: 52800
//   };

//   const total =
//     bookingInfo.ticketTotal + bookingInfo.comboTotal - bookingInfo.discount;

//   res.render("booking/payment", {
//     title: "Thanh toán",
//     movie,
//     promotions,
//     bookingInfo,
//     total
//   });
// });

// router.get("/qr-payment/:id", (req, res) => {
//   const movie = movies.find((item) => item._id === req.params.id);

//   if (!movie) {
//     return res.status(404).send("Không tìm thấy phim");
//   }

//   const orderInfo = {
//     orderCode: "PC17737557333957662",
//     amount: 211200,
//     expireTime: "04:52",
//     bankName: "MB",
//     accountNumber: "123456789",
//     accountHolder: "POPCORN CINEMA",
//     transferContent: "PC17737557333957662",
//     qrImage: "/images/booking/payment/qr-demo.png"
//   };

//   res.render("booking/qr-payment", {
//     title: "Thanh toán QR",
//     movie,
//     orderInfo
//   });
// });
// router.get("/success/:id", (req, res) => {
//   const movie = movies.find((item) => item._id === req.params.id);

//   if (!movie) {
//     return res.status(404).send("Không tìm thấy phim");
//   }

//   const ticketInfo = {
//     orderCode: "PC17737557333957662",
//     ticketCode: "TICKET-983421",
//     cinema: "Popcorn Cinema - SC VivoCity",
//     room: "Phòng 2",
//     showtime: "19:00 18/03/2026",
//     seats: ["I8", "I9"],
//     total: 211200,
//     qrImage: "/images/booking/payment/qr-demo.png"
//   };

//   res.render("booking/ticket-detail", {
//     title: "Thông tin vé",
//     movie,
//     ticketInfo
//   });
// });

//   res.render("booking/showtime", {
//     title: "Chọn ghế",
//     movie,
//     seatLayout,
//     holdMinutes: "04:51",
//     cinemas,
//     showtimes
//   });
// });

// module.exports = router; 

//----------------------------------------------
const express = require("express");
const router = express.Router();

const movies = [
  {
    _id: "1",
    title: "Tài",
    poster: "/images/movies/phim1.jpg",
    ageRating: "T16",
    duration: 100
  },
  {
    _id: "2",
    title: "Thỏ Ơi!!",
    poster: "/images/movies/phim2.jpg",
    ageRating: "T18",
    duration: 127
  }
];

function generateSeatLayout() {
  const rows = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
  const layout = [];

  rows.forEach((row) => {
    const seats = [];

    if (row !== "J") {
      for (let i = 1; i <= 14; i++) {
        let type = "standard";
        let status = "available";

        if (
          (row === "H" && (i === 8 || i === 9)) ||
          (row === "D" && i === 3) ||
          (row === "F" && i === 12)
        ) {
          status = "booked";
        }

        seats.push({
          code: `${row}${i}`,
          label: `${i}`,
          type,
          status
        });
      }
    } else {
      for (let i = 1; i <= 7; i++) {
        seats.push({
          code: `${row}${i}`,
          label: `${i}`,
          type: "couple",
          status: "available"
        });
      }
    }

    layout.push({
      row,
      seats
    });
  });

  return layout;
}

function getMovieById(id) {
  return movies.find((item) => item._id === id);
}

router.get("/showtime/:id", (req, res) => {
  const movie = getMovieById(req.params.id);

  if (!movie) {
    return res.status(404).send("Không tìm thấy phim");
  }

  const cinemas = [
    { id: "cinema-1", name: "Galaxy CineX - Hanoi Centre", active: true },
    { id: "cinema-2", name: "Galaxy CineX - Long Biên", active: false },
    { id: "cinema-3", name: "Galaxy CineX - Times City", active: false }
  ];

  const showtimes = [
    { id: "time-1", value: "17:30", active: false },
    { id: "time-2", value: "19:45", active: true },
    { id: "time-3", value: "21:30", active: false }
  ];

  res.render("booking/showtime", {
    title: "Chọn ghế",
    movie,
    seatLayout: generateSeatLayout(),
    holdMinutes: "04:51",
    cinemas,
    showtimes
  });
});

router.get("/snacks/:id", (req, res) => {
  const movie = getMovieById(req.params.id);

  if (!movie) {
    return res.status(404).send("Không tìm thấy phim");
  }

  const snacks = [
    {
      id: "combo-1",
      name: "Combo Solo",
      description: "1 bắp vừa + 1 nước ngọt vừa",
      price: 69000,
      image: "/images/booking/snacks/combo-1.png"
    },
    {
      id: "combo-2",
      name: "Combo Couple",
      description: "1 bắp lớn + 2 nước ngọt vừa",
      price: 119000,
      image: "/images/booking/snacks/combo-2.png"
    },
    {
      id: "combo-3",
      name: "Combo Family",
      description: "2 bắp lớn + 4 nước ngọt",
      price: 199000,
      image: "/images/booking/snacks/combo-3.png"
    },
    {
      id: "snack-1",
      name: "Bắp caramel",
      description: "1 phần bắp vị caramel",
      price: 45000,
      image: "/images/booking/snacks/popcorn-caramel.png"
    },
    {
      id: "drink-1",
      name: "Coca Cola",
      description: "1 ly nước ngọt size M",
      price: 30000,
      image: "/images/booking/snacks/coke.png"
    },
    {
      id: "drink-2",
      name: "Pepsi",
      description: "1 ly nước ngọt size M",
      price: 30000,
      image: "/images/booking/snacks/pepsi.png"
    }
  ];

  res.render("booking/snacks", {
    title: "Chọn bắp nước",
    movie,
    snacks
  });
});

router.get("/payment/:id", (req, res) => {
  const movie = getMovieById(req.params.id);

  if (!movie) {
    return res.status(404).send("Không tìm thấy phim");
  }

  const promotions = [
    { id: "promo-1", label: "Giảm 20% vé tối thứ 3", discount: 52800 },
    { id: "promo-2", label: "Giảm 10% tổng hóa đơn", discount: 26000 },
    { id: "promo-3", label: "Không áp dụng khuyến mãi", discount: 0 }
  ];

  const bookingInfo = {
    cinema: "Galaxy CineX - Hanoi Centre",
    room: "Phòng 2",
    showtime: "19:45 24/03/2026",
    seats: ["I8", "I9"],
    ticketTotal: 160000,
    comboTotal: 119000,
    discount: 52800
  };

  const total =
    bookingInfo.ticketTotal + bookingInfo.comboTotal - bookingInfo.discount;

  res.render("booking/payment", {
    title: "Thanh toán",
    movie,
    promotions,
    bookingInfo,
    total
  });
});

router.get("/qr-payment/:id", (req, res) => {
  const movie = getMovieById(req.params.id);

  if (!movie) {
    return res.status(404).send("Không tìm thấy phim");
  }

  const orderInfo = {
    orderCode: "PC17737557333957662",
    amount: 211200,
    expireTime: "04:52",
    bankName: "MB",
    accountNumber: "123456789",
    accountHolder: "POPCORN CINEMA",
    transferContent: "PC17737557333957662",
    qrImage: "/images/booking/payment/qr-demo.png"
  };

  res.render("booking/qr-payment", {
    title: "Thanh toán QR",
    movie,
    orderInfo
  });
});

router.get("/success/:id", (req, res) => {
  const movie = getMovieById(req.params.id);

  if (!movie) {
    return res.status(404).send("Không tìm thấy phim");
  }

  const ticketInfo = {
    orderCode: "PC17737557333957662",
    ticketCode: "TICKET-983421",
    cinema: "Popcorn Cinema - SC VivoCity",
    room: "Phòng 2",
    showtime: "19:00 18/03/2026",
    seats: ["I8", "I9"],
    total: 211200,
    qrImage: "/images/booking/payment/qr-demo.png"
  };

  res.render("booking/ticket-detail", {
    title: "Thông tin vé",
    movie,
    ticketInfo
  });
});

module.exports = router;