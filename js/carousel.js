document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector("[data-carousel]");
  if (!carousel) return;

  const slides = [...carousel.querySelectorAll(".hero-slide")];
  const dots = [...carousel.querySelectorAll(".dot")];
  const prev = carousel.querySelector("[data-prev]");
  const next = carousel.querySelector("[data-next]");
  let index = 0;
  let timer;

  const show = i => {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, n) => slide.classList.toggle("active", n === index));
    dots.forEach((dot, n) => dot.classList.toggle("active", n === index));
  };
  const start = () => timer = setInterval(() => show(index + 1), 5500);
  const restart = () => { clearInterval(timer); start(); };

  prev?.addEventListener("click", () => { show(index - 1); restart(); });
  next?.addEventListener("click", () => { show(index + 1); restart(); });
  dots.forEach((dot, n) => dot.addEventListener("click", () => { show(n); restart(); }));

  let startX = 0;
  carousel.addEventListener("touchstart", e => startX = e.touches[0].clientX, { passive: true });
  carousel.addEventListener("touchend", e => {
    const delta = e.changedTouches[0].clientX - startX;
    if (Math.abs(delta) > 45) { show(index + (delta < 0 ? 1 : -1)); restart(); }
  }, { passive: true });

  carousel.addEventListener("mouseenter", () => clearInterval(timer));
  carousel.addEventListener("mouseleave", start);
  show(0);
  start();
});

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-gallery]").forEach(gallery => {
    const track = gallery.querySelector(".gallery-track");
    const slides = [...gallery.querySelectorAll(".gallery-slide")];
    const dots = [...gallery.querySelectorAll(".gallery-dot")];
    const prev = gallery.querySelector(".prev");
    const next = gallery.querySelector(".next");
    let index = 0;

    const show = i => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d,n) => d.classList.toggle("active", n === index));
    };
    prev?.addEventListener("click", () => show(index - 1));
    next?.addEventListener("click", () => show(index + 1));
    dots.forEach((d,n) => d.addEventListener("click", () => show(n)));

    let sx = 0;
    gallery.addEventListener("touchstart", e => sx = e.touches[0].clientX, { passive: true });
    gallery.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 45) show(index + (dx < 0 ? 1 : -1));
    }, { passive: true });
  });
});
