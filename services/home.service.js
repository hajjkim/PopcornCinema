const getHomeData = async () => {
  return {
    nowShowing: [
      {
        _id: "1",
        title: "Thế Giới Ma",
        poster: "/images/movies/default.jpg",
        genre: "Kinh dị"
      },
      {
        _id: "2",
        title: "Avengers",
        poster: "/images/movies/default.jpg",
        genre: "Hành động"
      }
    ],
    comingSoon: [
      {
        _id: "3",
        title: "Batman 2",
        poster: "/images/movies/default.jpg",
        genre: "Hành động"
      }
    ],
    promotions: [
      {
        _id: "4",
        title: "Giảm 20% combo",
        image: "/images/promotions/default.jpg",
        description: "Áp dụng cuối tuần"
      }
    ]
  };
};

module.exports = {
  getHomeData
};