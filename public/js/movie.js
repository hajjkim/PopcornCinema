document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".movie-tab");
  const cards = document.querySelectorAll(".movie-poster-card");

  if (!tabs.length || !cards.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");

      const filter = tab.dataset.filter;

      cards.forEach((card) => {
        const status = card.dataset.status;

        if (filter === "all") {
          card.classList.remove("hidden");
          return;
        }

        if (status === filter) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });
});