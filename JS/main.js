let slideIndex = 0;
let total = 0;
let interval = null;

document.addEventListener("DOMContentLoaded", function () {
  const windowWidth = window.innerWidth;
  const slides = document.querySelectorAll("#slides li");
  total = slides.length;
  const slidesWidth = total * windowWidth;

  // Set width of each slide and the slides container
  document.querySelectorAll(".slide").forEach((slide) => {
    slide.style.width = `${windowWidth}px`;
  });

  document.getElementById("slides").style.width = `${slidesWidth}px`;

  // Set the first slide to be visible
  slides[0].classList.add("alive");

  // Handle left navigation click
  document.getElementById("left").addEventListener("click", function () {
    slide("back");
  });

  // Handle right navigation click
  document.getElementById("right").addEventListener("click", function () {
    slide("forward");
  });

  // Handle dot indicators
  const indicators = document.querySelectorAll(".indicator");
  indicators[0].classList.add("active");

  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", function () {
      doIt(index);
    });
  });

  startAutoSlide(); // Start auto sliding

  // Pause auto-slide on mouse hover
  document
    .getElementById("slide-window")
    .addEventListener("mouseover", pauseAutoSlide);

  // Resume auto-slide on mouse leave
  document
    .getElementById("slide-window")
    .addEventListener("mouseout", startAutoSlide);

  // Handle keyboard navigation
  document.addEventListener("keydown", function (event) {
    if (event.key === "ArrowLeft") {
      slide("back");
    } else if (event.key === "ArrowRight") {
      slide("forward");
    }
  });
});

function slide(direction) {
  let target;

  if (direction === "back") {
    target = slideIndex - 1;
  } else if (direction === "forward") {
    target = slideIndex + 1;
  }

  // Wrap around to the last slide if moving back from the first slide
  if (target === -1) {
    doIt(total - 1);
  } 
  // Wrap around to the first slide if moving forward from the last slide
  else if (target === total) {
    doIt(0);
  } 
  // Slide to the target slide
  else {
    doIt(target);
  }
}

function doIt(target) {
  const windowWidth = window.innerWidth;
  const margin = windowWidth * target;
  const actualTarget = target + 1;

  // Activate the target slide
  document
    .querySelector(`#slides li:nth-child(${actualTarget})`)
    .classList.add("alive");
  
  // Slide the container to the target position
  document.getElementById(
    "slides"
  ).style.transform = `translate3d(-${margin}px, 0px, 0px)`;

  slideIndex = target; // Update the current slide index

  // Update the active indicator
  const indicators = document.querySelectorAll(".indicator");
  indicators.forEach((indicator) => indicator.classList.remove("active"));
  indicators[target].classList.add("active");
}

function startAutoSlide() {
  clearInterval(interval); // Clear any existing interval

  // Start a new auto-slide interval
  interval = setInterval(function () {
    slide("forward");
  }, 4000);
}

function pauseAutoSlide() {
  clearInterval(interval); // Pause auto-slide
}
