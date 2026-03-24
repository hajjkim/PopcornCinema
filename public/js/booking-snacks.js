document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);

  const cinema = params.get("cinema") || "Galaxy CineX - Hanoi Centre";
  const showtime = params.get("showtime") || "19:45";
  const seats = params.get("seats") || "I8,I9";
  const ticketTotal = Number(params.get("ticketTotal") || 160000);

  const snackCinema = document.getElementById("snackCinema");
  const snackShowtime = document.getElementById("snackShowtime");
  const snackSeats = document.getElementById("snackSeats");
  const snackTicketTotal = document.getElementById("snackTicketTotal");
  const snackSelectedItems = document.getElementById("snackSelectedItems");
  const snackComboTotal = document.getElementById("snackComboTotal");
  const snackGrandTotal = document.getElementById("snackGrandTotal");
  const goToPaymentPage = document.getElementById("goToPaymentPage");

  const cards = document.querySelectorAll(".snack-card");

  function formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + "đ";
  }

  snackCinema.textContent = cinema;
  snackShowtime.textContent = showtime;
  snackSeats.textContent = seats;
  snackTicketTotal.textContent = formatCurrency(ticketTotal);

  function updateSummary() {
    const selectedItems = [];
    let comboTotal = 0;

    cards.forEach((card) => {
      const qty = Number(card.querySelector(".qty-value").textContent);
      const name = card.dataset.name;
      const price = Number(card.dataset.price);

      if (qty > 0) {
        selectedItems.push(`${name} x${qty}`);
        comboTotal += qty * price;
      }
    });

    snackSelectedItems.textContent = selectedItems.length
      ? selectedItems.join(", ")
      : "Chưa chọn";

    snackComboTotal.textContent = formatCurrency(comboTotal);
    snackGrandTotal.textContent = formatCurrency(ticketTotal + comboTotal);

    if (goToPaymentPage) {
      const url = new URL(goToPaymentPage.href, window.location.origin);
      url.searchParams.set("cinema", cinema);
      url.searchParams.set("showtime", showtime);
      url.searchParams.set("seats", seats);
      url.searchParams.set("ticketTotal", ticketTotal);
      url.searchParams.set("comboTotal", comboTotal);
      goToPaymentPage.href = url.pathname + url.search;
    }
  }

  cards.forEach((card) => {
    const minusBtn = card.querySelector(".minus-btn");
    const plusBtn = card.querySelector(".plus-btn");
    const qtyValue = card.querySelector(".qty-value");

    minusBtn.addEventListener("click", () => {
      let qty = Number(qtyValue.textContent);
      if (qty > 0) qty--;
      qtyValue.textContent = qty;
      updateSummary();
    });

    plusBtn.addEventListener("click", () => {
      let qty = Number(qtyValue.textContent);
      qty++;
      qtyValue.textContent = qty;
      updateSummary();
    });
  });

  updateSummary();
});