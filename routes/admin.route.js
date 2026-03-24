const express = require("express");
const router = express.Router();

const { requireAdmin } = require("../middlewares/auth.middleware");
const upload = require("../middlewares/upload.middleware");
const MovieModel = require("../models/movie.model");
// const path = require("path");
// const multer = require("multer");
// ==============================
// Demo data
// ==============================

let movies = [
  {
    id: 1,
    title: "Avengers: Endgame",
    genre: "Hành động, Viễn tưởng",
    duration: 181,
    release_date: "2019-04-26",
    status: "NOW_SHOWING",
    poster_url: "/images/movies/endgame.jpg",
    age_rating: "C13",
    director: "Anthony Russo, Joe Russo",
    actors: "Robert Downey Jr., Chris Evans, Scarlett Johansson",
    language: "Tiếng Anh",
    subtitle: "Tiếng Việt",
    trailer_url: "https://youtube.com",
    description: "Biệt đội Avengers bước vào trận chiến cuối cùng để cứu vũ trụ."
  },
  {
    id: 2,
    title: "Kung Fu Panda 4",
    genre: "Hoạt hình, Phiêu lưu",
    duration: 94,
    release_date: "2024-03-08",
    status: "COMING_SOON",
    poster_url: "/images/movies/kungfupanda4.jpg",
    age_rating: "P",
    director: "Mike Mitchell",
    actors: "Jack Black",
    language: "Tiếng Anh",
    subtitle: "Tiếng Việt",
    trailer_url: "https://youtube.com",
    description: "Po bước vào chuyến phiêu lưu mới cùng những thử thách mới."
  }
];

const cinemas = [
  {
    id: 1,
    name: "Popcorn Cinema Gò Vấp",
    address: "12 Nguyễn Oanh, Phường 7",
    city: "Hồ Chí Minh",
    totalRooms: 6,
    phone: "0901234567",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Popcorn Cinema Cầu Giấy",
    address: "88 Xuân Thủy, Cầu Giấy",
    city: "Hà Nội",
    totalRooms: 8,
    phone: "0908889999",
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "Popcorn Cinema Hải Châu",
    address: "15 Lê Duẩn, Hải Châu",
    city: "Đà Nẵng",
    totalRooms: 5,
    phone: "0911222333",
    status: "INACTIVE"
  }
];

const showtimes = [
  {
    id: 1,
    movieTitle: "Avengers: Endgame",
    cinemaName: "Popcorn Cinema Gò Vấp",
    roomName: "Phòng 1",
    showDate: "2026-03-21",
    startTime: "09:00",
    endTime: "12:01",
    format: "2D Phụ đề",
    status: "OPEN"
  },
  {
    id: 2,
    movieTitle: "Kung Fu Panda 4",
    cinemaName: "Popcorn Cinema Cầu Giấy",
    roomName: "Phòng 3",
    showDate: "2026-03-21",
    startTime: "14:00",
    endTime: "15:34",
    format: "2D Lồng tiếng",
    status: "OPEN"
  },
  {
    id: 3,
    movieTitle: "Thỏ ơi!!!",
    cinemaName: "Popcorn Cinema Hải Châu",
    roomName: "Phòng 2",
    showDate: "2026-03-22",
    startTime: "19:00",
    endTime: "21:10",
    format: "3D Phụ đề",
    status: "CLOSED"
  }
];
let orders = [
  {
    id: 1,
    orderCode: "ORD001",
    customerName: "Nguyễn Văn A",
    movieTitle: "Avengers: Endgame",
    cinemaName: "Popcorn Cinema Gò Vấp",
    roomName: "Phòng 1",
    showDate: "2026-03-21",
    showTime: "09:00",
    quantity: 2,
    seats: ["A1", "A2"],
    totalAmount: 180000,
    status: "PENDING",
    paymentMethod: "BANK"
  },
  {
    id: 2,
    orderCode: "ORD002",
    customerName: "Trần Thị B",
    movieTitle: "Kung Fu Panda 4",
    cinemaName: "Popcorn Cinema Cầu Giấy",
    roomName: "Phòng 3",
    showDate: "2026-03-21",
    showTime: "14:00",
    quantity: 4,
    seats: ["B3", "B4", "B5", "B6"],
    totalAmount: 320000,
    status: "PAID",
    paymentMethod: "VNPAY"
  },
  {
    id: 3,
    orderCode: "ORD003",
    customerName: "Lê Văn C",
    movieTitle: "Thỏ ơi!!!",
    cinemaName: "Popcorn Cinema Hải Châu",
    roomName: "Phòng 2",
    showDate: "2026-03-22",
    showTime: "19:00",
    quantity: 1,
    seats: ["C7"],
    totalAmount: 90000,
    status: "CANCELLED",
    paymentMethod: "CASH"
  }
];

let users = [
  {
    id: 1,
    fullName: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0901234567",
    role: "CUSTOMER",
    status: "ACTIVE",
    createdAt: "2026-03-01"
  },
  {
    id: 2,
    fullName: "Trần Thị B",
    email: "tranthib@gmail.com",
    phone: "0912345678",
    role: "CUSTOMER",
    status: "ACTIVE",
    createdAt: "2026-03-05"
  },
  {
    id: 3,
    fullName: "Lê Minh Admin",
    email: "admin@popcorncinema.com",
    phone: "0988888888",
    role: "ADMIN",
    status: "ACTIVE",
    createdAt: "2026-02-20"
  }
];
let promotions = [
  {
    id: 1,
    title: "Giảm cuối tuần",
    code: "WEEKEND10",
    discountType: "PERCENT",
    discountValue: 10,
    minOrderValue: 100000,
    maxDiscountValue: 50000,
    startDate: "2026-03-20",
    endDate: "2026-03-31",
    status: "ACTIVE",
    poster: "/images/promotions/promo-default.jpg",
    description: "Giảm 10% cho hóa đơn cuối tuần."
  },
  {
    id: 2,
    title: "Tặng ngay 30K",
    code: "SAVE30K",
    discountType: "AMOUNT",
    discountValue: 30000,
    minOrderValue: 150000,
    maxDiscountValue: 30000,
    startDate: "2026-03-18",
    endDate: "2026-04-05",
    status: "ACTIVE",
    poster: "/images/promotions/promo-default.jpg",
    description: "Giảm trực tiếp 30.000đ cho đơn từ 150.000đ."
  }
];
let snacks = [
  {
    id: 1,
    name: "Combo Solo",
    type: "COMBO",
    description: "1 bắp vừa + 1 nước ngọt vừa",
    price: 69000,
    image: "/images/booking/snacks/combo-1.png",
    status: "ACTIVE"
  },
  {
    id: 2,
    name: "Combo Couple",
    type: "COMBO",
    description: "1 bắp lớn + 2 nước ngọt vừa",
    price: 119000,
    image: "/images/booking/snacks/combo-2.png",
    status: "ACTIVE"
  },
  {
    id: 3,
    name: "Combo Family",
    type: "COMBO",
    description: "2 bắp lớn + 4 nước ngọt",
    price: 199000,
    image: "/images/booking/snacks/combo-3.png",
    status: "ACTIVE"
  },
  {
    id: 4,
    name: "Bắp Caramel",
    type: "POPCORN",
    description: "1 phần bắp vị caramel",
    price: 45000,
    image: "/images/booking/snacks/popcorn-caramel.png",
    status: "ACTIVE"
  },
  {
    id: 5,
    name: "Coca Cola",
    type: "DRINK",
    description: "1 ly nước ngọt size M",
    price: 30000,
    image: "/images/booking/snacks/coke.png",
    status: "ACTIVE"
  },
  {
    id: 6,
    name: "Pepsi",
    type: "DRINK",
    description: "1 ly nước ngọt size M",
    price: 30000,
    image: "/images/booking/snacks/pepsi.png",
    status: "INACTIVE"
  }
];
// ==============================
// Báo cáo thống kê demo UI
// ==============================
router.get("/reports", requireAdmin, (req, res) => {
  const reportType = req.query.type || "movies";

  const movieReport = [
    {
      id: 1,
      title: "Tài",
      poster: "/images/movies/phim1.jpg",
      ticketsSold: 320,
      orders: 168,
      revenue: 25600000
    },
    {
      id: 2,
      title: "Thỏ Ơi!!",
      poster: "/images/movies/phim2.jpg",
      ticketsSold: 275,
      orders: 140,
      revenue: 22000000
    },
    {
      id: 3,
      title: "Lật Mặt Demo",
      poster: "/images/movies/phim3.jpg",
      ticketsSold: 210,
      orders: 110,
      revenue: 16800000
    },
    {
      id: 4,
      title: "Avengers Mock",
      poster: "/images/movies/phim4.jpg",
      ticketsSold: 180,
      orders: 95,
      revenue: 14400000
    }
  ];

  const snackReport = [
    {
      id: 1,
      name: "Combo Couple",
      image: "/images/booking/snacks/combo-2.png",
      quantitySold: 186,
      orders: 150,
      revenue: 22134000,
      type: "COMBO"
    },
    {
      id: 2,
      name: "Combo Solo",
      image: "/images/booking/snacks/combo-1.png",
      quantitySold: 172,
      orders: 145,
      revenue: 11868000,
      type: "COMBO"
    },
    {
      id: 3,
      name: "Bắp Caramel",
      image: "/images/booking/snacks/popcorn-caramel.png",
      quantitySold: 160,
      orders: 133,
      revenue: 7200000,
      type: "POPCORN"
    },
    {
      id: 4,
      name: "Coca Cola",
      image: "/images/booking/snacks/coke.png",
      quantitySold: 148,
      orders: 130,
      revenue: 4440000,
      type: "DRINK"
    }
  ];

  const totalTicketSold = movieReport.reduce((sum, item) => {
    return sum + Number(item.ticketsSold || 0);
  }, 0);

  const totalMovieRevenue = movieReport.reduce((sum, item) => {
    return sum + Number(item.revenue || 0);
  }, 0);

  const totalSnackSold = snackReport.reduce((sum, item) => {
    return sum + Number(item.quantitySold || 0);
  }, 0);

  const totalSnackRevenue = snackReport.reduce((sum, item) => {
    return sum + Number(item.revenue || 0);
  }, 0);

  const totalOrders = movieReport.reduce((sum, item) => {
    return sum + Number(item.orders || 0);
  }, 0);

  res.render("admin/report-management", {
    title: "Báo cáo thống kê",
    reportType,
    movieReport,
    snackReport,
    stats: {
      totalOrders,
      totalTicketSold,
      totalMovieRevenue,
      totalSnackSold,
      totalSnackRevenue,
      topMovie: movieReport.length ? movieReport[0] : null,
      topSnack: snackReport.length ? snackReport[0] : null
    },
    sessionUser: req.session ? req.session.user : null
  });
});
// ==============================
// Dashboard
// ==============================
router.get("/dashboard", requireAdmin, (req, res) => {
  res.render("admin/dashboard", {
    title: "Dashboard Admin",
    sessionUser: req.session.user,
    revenueData: [120, 180, 260, 230, 340, 410, 480]
  });
});
router.get("/dashboard", requireAdmin, (req, res) => {
  const stats = {
    totalRevenue: "1.250.000.000đ",
    ticketsSold: 12840,
    newUsers: 325,
    totalOrders: 2180
  };

  const revenue7Days = [
    { day: "T2", value: 120 },
    { day: "T3", value: 180 },
    { day: "T4", value: 140 },
    { day: "T5", value: 260 },
    { day: "T6", value: 320 },
    { day: "T7", value: 420 },
    { day: "CN", value: 390 }
  ];

  const topMovies = [
    { title: "Thỏ ơi!!!", image: "/images/movies/phim2.jpg" },
    { title: "Nhà Bà Tôi Một Phòng", image: "/images/movies/phim6.jpg" },
    { title: "Bầu Vật Trời Cho", image: "/images/movies/phim4.jpg" },
    { title: "Biệt Đội Thú Cưng", image: "/images/movies/phim3.jpg" }
  ];

  res.render("admin/dashboard", {
    title: "Dashboard Admin",
    stats,
    revenue7Days,
    topMovies,
    sessionUser: req.session.user
  });
});

// ==============================
// Quản lý phim
// ==============================
// ==============================
// Quản lý phim - dùng MySQL
// ==============================

// Danh sách phim
router.get("/movies", requireAdmin, async (req, res) => {
  try {
    const { keyword = "", status = "" } = req.query;

    const movies = await MovieModel.getFilteredMovies({ keyword, status });

    res.render("admin/movie-management", {
      title: "Quản lý phim",
      movies,
      keyword,
      status,
      sessionUser: req.session.user
    });
  } catch (error) {
    console.error("Lỗi lấy danh sách phim:", error);
    res.status(500).send("Lỗi server");
  }
});

// Form thêm phim
router.get("/movies/create", requireAdmin, (req, res) => {
  res.render("admin/movie-create", {
    title: "Thêm phim",
    movie: null,
    sessionUser: req.session.user
  });
});

// Xử lý thêm phim
router.post(
  "/movies/create",
  requireAdmin,
  upload.single("poster"),
  async (req, res) => {
    try {
      const {
        title,
        genre,
        duration,
        release_date,
        status,
        age_rating,
        director,
        actors,
        language,
        subtitle,
        trailer_url,
        description
      } = req.body;

      let poster_url = "";
      if (req.file) {
        poster_url = "/uploads/movies/" + req.file.filename;
      }

      const insertId = await MovieModel.createMovie({
        title,
        genre,
        duration: Number(duration),
        release_date,
        status,
        poster_url,
        age_rating,
        director,
        actors,
        language,
        subtitle,
        trailer_url,
        description
      });

      console.log("Đã thêm phim, id =", insertId);

      return res.redirect("/admin/movies");
    } catch (error) {
      console.error("Lỗi thêm phim:", error);
      return res.status(500).send("Thêm phim thất bại");
    }
  }
);

// Form sửa phim
router.get("/movies/:id/edit", requireAdmin, async (req, res) => {
  try {
    const movieId = Number(req.params.id);
    const movie = await MovieModel.getMovieById(movieId);

    if (!movie) {
      return res.status(404).send("Không tìm thấy phim");
    }

    res.render("admin/movie-edit", {
      title: "Sửa phim",
      movie,
      sessionUser: req.session.user
    });
  } catch (error) {
    console.error("Lỗi lấy phim để sửa:", error);
    return res.status(500).send("Lỗi server");
  }
});

// Xử lý sửa phim
router.post(
  "/movies/:id/edit",
  requireAdmin,
  upload.single("poster"),
  async (req, res) => {
    try {
      const movieId = Number(req.params.id);
      const oldMovie = await MovieModel.getMovieById(movieId);

      if (!oldMovie) {
        return res.status(404).send("Không tìm thấy phim");
      }

      let poster_url = oldMovie.poster_url || "";
      if (req.file) {
        poster_url = "/uploads/movies/" + req.file.filename;
      }

      await MovieModel.updateMovie(movieId, {
        title: req.body.title,
        genre: req.body.genre,
        duration: Number(req.body.duration),
        release_date: req.body.release_date,
        status: req.body.status,
        poster_url,
        age_rating: req.body.age_rating,
        director: req.body.director,
        actors: req.body.actors,
        language: req.body.language,
        subtitle: req.body.subtitle,
        trailer_url: req.body.trailer_url,
        description: req.body.description
      });

      return res.redirect(`/admin/movies/${movieId}`);
    } catch (error) {
      console.error("Lỗi sửa phim:", error);
      return res.status(500).send("Cập nhật phim thất bại");
    }
  }
);

// Xóa phim
router.post("/movies/:id/delete", requireAdmin, async (req, res) => {
  try {
    const movieId = Number(req.params.id);
    await MovieModel.deleteMovie(movieId);
    return res.redirect("/admin/movies");
  } catch (error) {
    console.error("Lỗi xóa phim:", error);
    return res.status(500).send("Xóa phim thất bại");
  }
});

// Chi tiết phim
router.get("/movies/:id", requireAdmin, async (req, res) => {
  try {
    const movieId = Number(req.params.id);
    const movie = await MovieModel.getMovieById(movieId);

    if (!movie) {
      return res.status(404).send("Không tìm thấy phim");
    }

    res.render("admin/movie-detail", {
      title: "Chi tiết phim",
      movie,
      sessionUser: req.session.user
    });
  } catch (error) {
    console.error("Lỗi chi tiết phim:", error);
    res.status(500).send("Lỗi server");
  }
});


// ==============================
// Quản lý rạp
// ==============================

// Danh sách rạp
router.get("/cinemas", requireAdmin, (req, res) => {
  const { keyword = "", city = "" } = req.query;

  let filteredCinemas = [...cinemas];

  if (keyword) {
    const keywordLower = keyword.toLowerCase();
    filteredCinemas = filteredCinemas.filter(cinema =>
      cinema.name.toLowerCase().includes(keywordLower) ||
      cinema.address.toLowerCase().includes(keywordLower)
    );
  }

  if (city) {
    filteredCinemas = filteredCinemas.filter(cinema => cinema.city === city);
  }

  res.render("admin/cinema-management", {
    title: "Quản lý rạp phim",
    cinemas: filteredCinemas,
    keyword,
    city,
    sessionUser: req.session.user
  });
});

// Form thêm rạp
router.get("/cinemas/create", requireAdmin, (req, res) => {
  res.render("admin/cinema-create", {
    title: "Thêm rạp phim",
    cinema: null,
    sessionUser: req.session.user
  });
});

// Xử lý thêm rạp
router.post("/cinemas/create", requireAdmin, (req, res) => {
  const {
    name,
    address,
    city,
    totalRooms,
    phone,
    status
  } = req.body;

  const newCinema = {
    id: cinemas.length ? cinemas[cinemas.length - 1].id + 1 : 1,
    name,
    address,
    city,
    totalRooms: Number(totalRooms),
    phone,
    status
  };

  cinemas.push(newCinema);

  return res.redirect("/admin/cinemas");
});

// Chi tiết rạp
router.get("/cinemas/:id", requireAdmin, (req, res) => {
  const cinemaId = Number(req.params.id);
  const cinema = cinemas.find(item => item.id === cinemaId);

  if (!cinema) {
    return res.status(404).send("Không tìm thấy rạp");
  }

  res.render("admin/cinema-detail", {
    title: "Chi tiết rạp phim",
    cinema,
    sessionUser: req.session.user
  });
});

// Form sửa rạp
router.get("/cinemas/:id/edit", requireAdmin, (req, res) => {
  const cinemaId = Number(req.params.id);
  const cinema = cinemas.find(item => item.id === cinemaId);

  if (!cinema) {
    return res.status(404).send("Không tìm thấy rạp");
  }

  res.render("admin/cinema-edit", {
    title: "Sửa rạp phim",
    cinema,
    sessionUser: req.session.user
  });
});

// Xử lý sửa rạp
router.post("/cinemas/:id/edit", requireAdmin, (req, res) => {
  const cinemaId = Number(req.params.id);
  const cinemaIndex = cinemas.findIndex(item => item.id === cinemaId);

  if (cinemaIndex === -1) {
    return res.status(404).send("Không tìm thấy rạp");
  }

  cinemas[cinemaIndex] = {
    ...cinemas[cinemaIndex],
    name: req.body.name,
    address: req.body.address,
    city: req.body.city,
    totalRooms: Number(req.body.totalRooms),
    phone: req.body.phone,
    status: req.body.status
  };

  return res.redirect(`/admin/cinemas/${cinemaId}`);
});

// Xóa rạp
router.post("/cinemas/:id/delete", requireAdmin, (req, res) => {
  const cinemaId = Number(req.params.id);
  cinemas = cinemas.filter(item => item.id !== cinemaId);
  return res.redirect("/admin/cinemas");
});

// ==============================
// Quản lý suất chiếu
// ==============================

// Danh sách suất chiếu
router.get("/showtimes", requireAdmin, (req, res) => {
  const { movie = "", cinema = "", date = "" } = req.query;

  let filteredShowtimes = [...showtimes];

  if (movie) {
    const movieLower = movie.toLowerCase();
    filteredShowtimes = filteredShowtimes.filter(item =>
      item.movieTitle.toLowerCase().includes(movieLower)
    );
  }

  if (cinema) {
    const cinemaLower = cinema.toLowerCase();
    filteredShowtimes = filteredShowtimes.filter(item =>
      item.cinemaName.toLowerCase().includes(cinemaLower)
    );
  }

  if (date) {
    filteredShowtimes = filteredShowtimes.filter(item => item.showDate === date);
  }

  res.render("admin/showtime-management", {
    title: "Quản lý suất chiếu",
    showtimes: filteredShowtimes,
    movie,
    cinema,
    date,
    sessionUser: req.session.user
  });
});

// Form thêm suất chiếu
router.get("/showtimes/create", requireAdmin, (req, res) => {
  res.render("admin/showtime-create", {
    title: "Thêm suất chiếu",
    showtime: null,
    sessionUser: req.session.user
  });
});

// Xử lý thêm suất chiếu
router.post("/showtimes/create", requireAdmin, (req, res) => {
  const {
    movieTitle,
    cinemaName,
    roomName,
    showDate,
    startTime,
    endTime,
    format,
    status
  } = req.body;

  const newShowtime = {
    id: showtimes.length ? showtimes[showtimes.length - 1].id + 1 : 1,
    movieTitle,
    cinemaName,
    roomName,
    showDate,
    startTime,
    endTime,
    format,
    status
  };

  showtimes.push(newShowtime);

  return res.redirect("/admin/showtimes");
});

// Chi tiết suất chiếu
router.get("/showtimes/:id", requireAdmin, (req, res) => {
  const showtimeId = Number(req.params.id);
  const showtime = showtimes.find(item => item.id === showtimeId);

  if (!showtime) {
    return res.status(404).send("Không tìm thấy suất chiếu");
  }

  res.render("admin/showtime-detail", {
    title: "Chi tiết suất chiếu",
    showtime,
    sessionUser: req.session.user
  });
});

// Form sửa suất chiếu
router.get("/showtimes/:id/edit", requireAdmin, (req, res) => {
  const showtimeId = Number(req.params.id);
  const showtime = showtimes.find(item => item.id === showtimeId);

  if (!showtime) {
    return res.status(404).send("Không tìm thấy suất chiếu");
  }

  res.render("admin/showtime-edit", {
    title: "Sửa suất chiếu",
    showtime,
    sessionUser: req.session.user
  });
});

// Xử lý sửa suất chiếu
router.post("/showtimes/:id/edit", requireAdmin, (req, res) => {
  const showtimeId = Number(req.params.id);
  const showtimeIndex = showtimes.findIndex(item => item.id === showtimeId);

  if (showtimeIndex === -1) {
    return res.status(404).send("Không tìm thấy suất chiếu");
  }

  showtimes[showtimeIndex] = {
    ...showtimes[showtimeIndex],
    movieTitle: req.body.movieTitle,
    cinemaName: req.body.cinemaName,
    roomName: req.body.roomName,
    showDate: req.body.showDate,
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    format: req.body.format,
    status: req.body.status
  };

  return res.redirect(`/admin/showtimes/${showtimeId}`);
});

// Xóa suất chiếu
router.post("/showtimes/:id/delete", requireAdmin, (req, res) => {
  const showtimeId = Number(req.params.id);
  showtimes = showtimes.filter(item => item.id !== showtimeId);
  return res.redirect("/admin/showtimes");
});

// ==============================
// Quản lý đơn hàng
// ==============================

// Danh sách đơn hàng
router.get("/orders", requireAdmin, (req, res) => {
  const { keyword = "", status = "" } = req.query;

  let filteredOrders = [...orders];

  if (keyword) {
    const keywordLower = keyword.toLowerCase();
    filteredOrders = filteredOrders.filter(
      (order) =>
        order.orderCode.toLowerCase().includes(keywordLower) ||
        order.customerName.toLowerCase().includes(keywordLower) ||
        order.movieTitle.toLowerCase().includes(keywordLower)
    );
  }

  if (status) {
    filteredOrders = filteredOrders.filter((order) => order.status === status);
  }

  res.render("admin/order-management", {
    title: "Quản lý đơn hàng",
    orders: filteredOrders,
    keyword,
    status,
    sessionUser: req.session.user
  });
});

// Chi tiết đơn hàng
router.get("/orders/:id", requireAdmin, (req, res) => {
  const orderId = Number(req.params.id);
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return res.status(404).send("Không tìm thấy đơn hàng");
  }

  res.render("admin/order-detail", {
    title: "Chi tiết đơn hàng",
    order,
    sessionUser: req.session.user
  });
});

// Form sửa đơn hàng
router.get("/orders/:id/edit", requireAdmin, (req, res) => {
  const orderId = Number(req.params.id);
  const order = orders.find((item) => item.id === orderId);

  if (!order) {
    return res.status(404).send("Không tìm thấy đơn hàng");
  }

  res.render("admin/order-edit", {
    title: "Sửa đơn hàng",
    order,
    sessionUser: req.session.user
  });
});

// Xử lý sửa đơn hàng
router.post("/orders/:id/edit", requireAdmin, (req, res) => {
  const orderId = Number(req.params.id);
  const orderIndex = orders.findIndex((item) => item.id === orderId);

  if (orderIndex === -1) {
    return res.status(404).send("Không tìm thấy đơn hàng");
  }

  orders[orderIndex] = {
    ...orders[orderIndex],
    status: req.body.status,
    paymentMethod: req.body.paymentMethod
  };

  return res.redirect(`/admin/orders/${orderId}`);
});

// Xóa đơn hàng
router.post("/orders/:id/delete", requireAdmin, (req, res) => {
  const orderId = Number(req.params.id);
  orders = orders.filter((item) => item.id !== orderId);
  return res.redirect("/admin/orders");
});
// ==============================
// Quản lý người dùng
// ==============================

// Danh sách người dùng
router.get("/users", requireAdmin, (req, res) => {
  const { keyword = "", role = "", status = "" } = req.query;

  let filteredUsers = [...users];

  if (keyword) {
    const keywordLower = keyword.toLowerCase();
    filteredUsers = filteredUsers.filter(
      (user) =>
        user.fullName.toLowerCase().includes(keywordLower) ||
        user.email.toLowerCase().includes(keywordLower) ||
        user.phone.toLowerCase().includes(keywordLower)
    );
  }

  if (role) {
    filteredUsers = filteredUsers.filter((user) => user.role === role);
  }

  if (status) {
    filteredUsers = filteredUsers.filter((user) => user.status === status);
  }

  res.render("admin/user-management", {
    title: "Quản lý người dùng",
    users: filteredUsers,
    keyword,
    role,
    status,
    sessionUser: req.session.user
  });
});

// Chi tiết người dùng
router.get("/users/:id", requireAdmin, (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return res.status(404).send("Không tìm thấy người dùng");
  }

  res.render("admin/user-detail", {
    title: "Chi tiết người dùng",
    user,
    sessionUser: req.session.user
  });
});

// Form thêm người dùng
router.get("/users/create", requireAdmin, (req, res) => {
  res.render("admin/user-create", {
    title: "Thêm người dùng",
    sessionUser: req.session.user
  });
});

// Xử lý thêm người dùng
router.post("/users/create", requireAdmin, (req, res) => {
  const { fullName, email, phone, role, status } = req.body;

  const existedUser = users.find(
    (item) => item.email.toLowerCase() === email.toLowerCase()
  );

  if (existedUser) {
    return res.status(400).send("Email đã tồn tại");
  }

  const newUser = {
    id: users.length ? Math.max(...users.map((item) => item.id)) + 1 : 1,
    fullName,
    email,
    phone,
    role,
    status,
    createdAt: new Date().toISOString().slice(0, 10)
  };

  users.push(newUser);

  return res.redirect("/admin/users");
});

// Form sửa người dùng
router.get("/users/:id/edit", requireAdmin, (req, res) => {
  const userId = Number(req.params.id);
  const user = users.find((item) => item.id === userId);

  if (!user) {
    return res.status(404).send("Không tìm thấy người dùng");
  }

  res.render("admin/user-edit", {
    title: "Sửa người dùng",
    user,
    sessionUser: req.session.user
  });
});

// Xử lý sửa người dùng
router.post("/users/:id/edit", requireAdmin, (req, res) => {
  const userId = Number(req.params.id);
  const userIndex = users.findIndex((item) => item.id === userId);

  if (userIndex === -1) {
    return res.status(404).send("Không tìm thấy người dùng");
  }

  const duplicatedEmail = users.find(
    (item) =>
      item.id !== userId &&
      item.email.toLowerCase() === req.body.email.toLowerCase()
  );

  if (duplicatedEmail) {
    return res.status(400).send("Email đã tồn tại");
  }

  users[userIndex] = {
    ...users[userIndex],
    fullName: req.body.fullName,
    email: req.body.email,
    phone: req.body.phone,
    role: req.body.role,
    status: req.body.status
  };

  return res.redirect(`/admin/users/${userId}`);
});

// Xóa người dùng
router.post("/users/:id/delete", requireAdmin, (req, res) => {
  const userId = Number(req.params.id);
  users = users.filter((item) => item.id !== userId);
  return res.redirect("/admin/users");
});
// ==============================
// Quản lý khuyến mãi
// ==============================

// Danh sách khuyến mãi
router.get("/promotions", requireAdmin, (req, res) => {
  const { keyword = "", status = "", discountType = "" } = req.query;

  let filteredPromotions = [...promotions];

  if (keyword) {
    const keywordLower = keyword.toLowerCase();
    filteredPromotions = filteredPromotions.filter(
      (item) =>
        item.title.toLowerCase().includes(keywordLower) ||
        item.code.toLowerCase().includes(keywordLower)
    );
  }

  if (status) {
    filteredPromotions = filteredPromotions.filter(
      (item) => item.status === status
    );
  }

  if (discountType) {
    filteredPromotions = filteredPromotions.filter(
      (item) => item.discountType === discountType
    );
  }

  res.render("admin/promotion-management", {
    title: "Quản lý khuyến mãi",
    promotions: filteredPromotions,
    keyword,
    status,
    discountType,
    sessionUser: req.session.user
  });
});

// Form thêm khuyến mãi
router.get("/promotions/create", requireAdmin, (req, res) => {
  res.render("admin/promotion-create", {
    title: "Thêm khuyến mãi",
    sessionUser: req.session.user
  });
});

// Xử lý thêm khuyến mãi
router.post(
  "/promotions/create",
  requireAdmin,
  upload.single("poster"),
  (req, res) => {
    const {
      title,
      code,
      discountType,
      discountValue,
      minOrderValue,
      maxDiscountValue,
      startDate,
      endDate,
      status,
      description
    } = req.body;

    const existedPromotion = promotions.find(
      (item) => item.code.toLowerCase() === code.toLowerCase()
    );

    if (existedPromotion) {
      return res.status(400).send("Mã khuyến mãi đã tồn tại");
    }

    let poster = "/images/promotions/promo-default.jpg";

    if (req.file) {
      poster = "/uploads/promotions/" + req.file.filename;
    }

    const newPromotion = {
      id: promotions.length ? Math.max(...promotions.map((item) => item.id)) + 1 : 1,
      title,
      code,
      discountType,
      discountValue: Number(discountValue),
      minOrderValue: Number(minOrderValue || 0),
      maxDiscountValue: Number(maxDiscountValue || 0),
      startDate,
      endDate,
      status,
      poster,
      description
    };

    promotions.push(newPromotion);

    return res.redirect("/admin/promotions");
  }
);

// Chi tiết khuyến mãi
router.get("/promotions/:id", requireAdmin, (req, res) => {
  const promotionId = Number(req.params.id);
  const promotion = promotions.find((item) => item.id === promotionId);

  if (!promotion) {
    return res.status(404).send("Không tìm thấy khuyến mãi");
  }

  res.render("admin/promotion-detail", {
    title: "Chi tiết khuyến mãi",
    promotion,
    sessionUser: req.session.user
  });
});

// ==============================
// Quản lý bắp nước
// ==============================

// Danh sách bắp nước
router.get("/snacks", requireAdmin, (req, res) => {
  const { keyword = "", type = "", status = "" } = req.query;

  let filteredSnacks = [...snacks];

  if (keyword) {
    const keywordLower = keyword.toLowerCase();
    filteredSnacks = filteredSnacks.filter(
      (item) =>
        item.name.toLowerCase().includes(keywordLower) ||
        item.description.toLowerCase().includes(keywordLower)
    );
  }

  if (type) {
    filteredSnacks = filteredSnacks.filter((item) => item.type === type);
  }

  if (status) {
    filteredSnacks = filteredSnacks.filter((item) => item.status === status);
  }

  res.render("admin/snack-management", {
    title: "Quản lý bắp nước",
    snacks: filteredSnacks,
    keyword,
    type,
    status,
    sessionUser: req.session.user
  });
});

// Form thêm món
router.get("/snacks/create", requireAdmin, (req, res) => {
  res.render("admin/snack-create", {
    title: "Thêm bắp nước",
    snack: null,
    sessionUser: req.session.user
  });
});

// Xử lý thêm món
router.post("/snacks/create", requireAdmin, upload.single("image"), (req, res) => {
  const { name, type, description, price, status } = req.body;

  const imagePath = req.file
    ? `/images/booking/snacks/${req.file.filename}`
    : "/images/booking/snacks/combo-1.png";

  const newSnack = {
    id: snacks.length ? Math.max(...snacks.map((item) => item.id)) + 1 : 1,
    name,
    type,
    description,
    price: Number(price),
    image: imagePath,
    status
  };

  snacks.push(newSnack);
  return res.redirect("/admin/snacks");
});

// Chi tiết món
router.get("/snacks/:id", requireAdmin, (req, res) => {
  const snackId = Number(req.params.id);
  const snack = snacks.find((item) => item.id === snackId);

  if (!snack) {
    return res.status(404).send("Không tìm thấy sản phẩm bắp nước");
  }

  res.render("admin/snack-detail", {
    title: "Chi tiết bắp nước",
    snack,
    sessionUser: req.session.user
  });
});

// Form sửa món
router.get("/snacks/:id/edit", requireAdmin, (req, res) => {
  const snackId = Number(req.params.id);
  const snack = snacks.find((item) => item.id === snackId);

  if (!snack) {
    return res.status(404).send("Không tìm thấy sản phẩm bắp nước");
  }

  res.render("admin/snack-edit", {
    title: "Sửa bắp nước",
    snack,
    sessionUser: req.session.user
  });
});

// Xử lý sửa món
router.post("/snacks/:id/edit", requireAdmin, upload.single("image"), (req, res) => {
  const snackId = Number(req.params.id);
  const snackIndex = snacks.findIndex((item) => item.id === snackId);

  if (snackIndex === -1) {
    return res.status(404).send("Không tìm thấy sản phẩm bắp nước");
  }

  const oldSnack = snacks[snackIndex];

  snacks[snackIndex] = {
    ...oldSnack,
    name: req.body.name,
    type: req.body.type,
    description: req.body.description,
    price: Number(req.body.price),
    image: req.file
      ? `/images/booking/snacks/${req.file.filename}`
      : oldSnack.image,
    status: req.body.status
  };

  return res.redirect(`/admin/snacks/${snackId}`);
});

// Xóa món
router.post("/snacks/:id/delete", requireAdmin, (req, res) => {
  const snackId = Number(req.params.id);
  snacks = snacks.filter((item) => item.id !== snackId);
  return res.redirect("/admin/snacks");
});
module.exports = router;