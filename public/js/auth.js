document.addEventListener("DOMContentLoaded", () => {
  const authBox = document.getElementById("authBox");
  const switchButtons = document.querySelectorAll(".switch-page-btn");

  switchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.getAttribute("data-target");
      const direction = button.getAttribute("data-direction");

      if (!authBox || !target) {
        window.location.href = target;
        return;
      }

      if (direction === "left") {
        authBox.classList.add("is-leaving-left");
      } else {
        authBox.classList.add("is-leaving-right");
      }

      setTimeout(() => {
        window.location.href = target;
      }, 420);
    });
  });
});