document.addEventListener("DOMContentLoaded", () => {
  const promotionSelect = document.getElementById("promotionSelect");
  const applyPromotionBtn = document.getElementById("applyPromotionBtn");

  const ticketTotalEl = document.getElementById("ticketTotal");
  const comboTotalEl = document.getElementById("comboTotal");
  const discountValueEl = document.getElementById("discountValue");
  const grandTotalEl = document.getElementById("grandTotal");

  function parseMoney(text) {
    return Number(text.replace(/[^\d]/g, "")) || 0;
  }

  function formatMoney(value) {
    return new Intl.NumberFormat("vi-VN").format(value) + " đ";
  }

  function updateTotal() {
    const ticketTotal = parseMoney(ticketTotalEl.textContent);
    const comboTotal = parseMoney(comboTotalEl.textContent);
    const discount = Number(promotionSelect.value || 0);

    const total = ticketTotal + comboTotal - discount;

    discountValueEl.textContent = formatMoney(discount);
    grandTotalEl.textContent = formatMoney(total > 0 ? total : 0);
  }

  applyPromotionBtn?.addEventListener("click", updateTotal);
});