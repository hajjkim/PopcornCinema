document.addEventListener("DOMContentLoaded", () => {
  const copyBtn = document.getElementById("copyTransferBtn");
  const transferContent = document.getElementById("transferContent");
  const expireTimer = document.getElementById("expireTimer");

  copyBtn?.addEventListener("click", async () => {
    try {
      const text = transferContent?.textContent?.trim() || "";
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "Đã sao chép";
      setTimeout(() => {
        copyBtn.textContent = "Sao chép nội dung CK";
      }, 1800);
    } catch (error) {
      console.error("Không thể sao chép:", error);
    }
  });

  function startCountdown() {
    if (!expireTimer) return;

    const parts = expireTimer.textContent.split(":");
    let minutes = parseInt(parts[0], 10);
    let seconds = parseInt(parts[1], 10);

    const interval = setInterval(() => {
      if (minutes === 0 && seconds === 0) {
        clearInterval(interval);
        expireTimer.textContent = "00:00";
        return;
      }

      if (seconds === 0) {
        minutes -= 1;
        seconds = 59;
      } else {
        seconds -= 1;
      }

      expireTimer.textContent =
        `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
    }, 1000);
  }

  startCountdown();
});