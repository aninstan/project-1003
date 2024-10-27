document.addEventListener("DOMContentLoaded", () => {
  let colors = ["#a8c0ff", "#8ac6d1", "#bbded6", "#fae3d9", "#ffb6b9"];
  let currentIndex = 0;

  setInterval(() => {
    const nextIndex = (currentIndex + 1) % colors.length;
    document.body.style.background = `linear-gradient(to right, ${colors[currentIndex]}, ${colors[nextIndex]})`;
    document.body.style.transition = "background 10s ease-in-out";
    currentIndex = nextIndex;
  }, 10000); // Endre farge hvert 10. sekund
});
