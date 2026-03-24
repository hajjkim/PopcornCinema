// document.addEventListener("DOMContentLoaded", () => {
//   const seatButtons = document.querySelectorAll(".seat-item:not(.booked)");
//   const selectedSeatsEl = document.getElementById("selectedSeats");
//   const selectedCountEl = document.getElementById("selectedCount");
//   const selectedTotalEl = document.getElementById("selectedTotal");
//   const timerEl = document.getElementById("seatTimer");

//   function formatCurrency(value) {
//     return new Intl.NumberFormat("vi-VN").format(value) + "đ";
//   }

//   function updateSeatSummary() {
//     const selected = document.querySelectorAll(".seat-item.selected");
//     const seats = [];
//     let total = 0;

//     selected.forEach((seat) => {
//       seats.push(seat.dataset.seat);
//       total += Number(seat.dataset.price || 0);
//     });

//     selectedSeatsEl.textContent = seats.length ? seats.join(", ") : "Chưa chọn";
//     selectedCountEl.textContent = seats.length;
//     selectedTotalEl.textContent = formatCurrency(total);
//   }

//   seatButtons.forEach((seat) => {
//     seat.addEventListener("click", () => {
//       seat.classList.toggle("selected");
//       updateSeatSummary();
//     });
//   });

//   function startSeatTimer() {
//     if (!timerEl) return;

//     const parts = timerEl.textContent.split(":");
//     let minutes = parseInt(parts[0], 10);
//     let seconds = parseInt(parts[1], 10);

//     const interval = setInterval(() => {
//       if (minutes === 0 && seconds === 0) {
//         clearInterval(interval);
//         timerEl.textContent = "00:00";
//         return;
//       }

//       if (seconds === 0) {
//         minutes -= 1;
//         seconds = 59;
//       } else {
//         seconds -= 1;
//       }

//       const mm = String(minutes).padStart(2, "0");
//       const ss = String(seconds).padStart(2, "0");
//       timerEl.textContent = `${mm}:${ss}`;
//     }, 1000);
//   }

//   updateSeatSummary();
//   startSeatTimer();
// });
///-------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const seatButtons = document.querySelectorAll(".seat-item:not(.booked)");
  const selectedSeatsEl = document.getElementById("selectedSeats");
  const selectedCountEl = document.getElementById("selectedCount");
  const selectedTotalEl = document.getElementById("selectedTotal");
  const timerEl = document.getElementById("seatTimer");
  const cinemaButtons = document.querySelectorAll(".booking-chip");
  const showtimeButtons = document.querySelectorAll(".booking-time");
  const selectedCinemaEl = document.getElementById("selectedCinema");
  const selectedShowtimeEl = document.getElementById("selectedShowtime");
  const goToSnackPage = document.getElementById("goToSnackPage");

  function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  }

  function getSelectedSeatsData() {
    const selected = document.querySelectorAll(".seat-item.selected");
    const seats = [];
    let total = 0;

    selected.forEach((seat) => {
      seats.push(seat.dataset.seat);
      total += Number(seat.dataset.price || 0);
    });

    return { seats, total };
  }

  function updateSeatSummary() {
    const { seats, total } = getSelectedSeatsData();

    selectedSeatsEl.textContent = seats.length ? seats.join(", ") : "Chưa chọn";
    selectedCountEl.textContent = seats.length;
    selectedTotalEl.textContent = formatCurrency(total);
  }

  seatButtons.forEach((seat) => {
    seat.addEventListener("click", () => {
      seat.classList.toggle("selected");
      updateSeatSummary();
    });
  });

  cinemaButtons.forEach((button) => {
    button.addEventListener("click", () => {
      cinemaButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      selectedCinemaEl.textContent = button.dataset.cinema;
    });
  });

  showtimeButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showtimeButtons.forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      selectedShowtimeEl.textContent = button.dataset.time;
    });
  });

  if (goToSnackPage) {
    goToSnackPage.addEventListener("click", (e) => {
      const { seats, total } = getSelectedSeatsData();

      if (!seats.length) {
        e.preventDefault();
        alert("Vui lòng chọn ít nhất 1 ghế");
        return;
      }

      const cinema = selectedCinemaEl.textContent.trim();
      const showtime = selectedShowtimeEl.textContent.trim();

      const url = new URL(goToSnackPage.href, window.location.origin);
      url.searchParams.set("seats", seats.join(","));
      url.searchParams.set("ticketTotal", total);
      url.searchParams.set("cinema", cinema);
      url.searchParams.set("showtime", showtime);

      goToSnackPage.href = url.pathname + url.search;
    });
  }

  function startSeatTimer() {
    if (!timerEl) return;

    const parts = timerEl.textContent.split(":");
    let minutes = parseInt(parts[0], 10);
    let seconds = parseInt(parts[1], 10);

    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        timerEl.textContent = "00:00";
        return;
      }

      if (seconds === 0) {
        minutes -= 1;
        seconds = 59;
      } else {
        seconds -= 1;
      }

      const mm = String(minutes).padStart(2, "0");
      const ss = String(seconds).padStart(2, "0");
      timerEl.textContent = `${mm}:${ss}`;
    }, 1000);
  }

  updateSeatSummary();
  startSeatTimer();
});