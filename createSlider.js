function createSlider({ root, fetchData, onRenderSlide, moveSlideDir }) {
  let currentIndex = 0;
  let datas = null;

  //   generates the basic template
  root.innerHTML = `
        <div class="slider-content"></div>
        <div>
          <button class="prev">Prev</button>
          <button class="next">Next</button>
        </div>
        <div class="dot-group"></div>
  `;

  const prev = root.querySelector(".prev");
  const next = root.querySelector(".next");
  const dotGroup = root.querySelector(".dot-group");
  const sliderContent = root.querySelector(".slider-content");

  function activateDot() {
    root.querySelectorAll(".dot").forEach((dot) => {
      dot.classList.remove("is-active");
      if (Number(dot.dataset.index) === currentIndex) {
        dot.classList.add("is-active");
      }
    });
  }

  function moveSlidePos() {
    const slides = root.querySelectorAll(".slide");
    slides.forEach((slide, index) => {
      slide.style.transform = moveSlideDir(index, currentIndex);
    });
  }

  function prevHandler() {
    currentIndex = currentIndex === 0 ? datas.length - 1 : currentIndex - 1;
  }

  function nextHandler() {
    currentIndex = currentIndex === datas.length - 1 ? 0 : currentIndex + 1;
  }

  async function loadPhotos() {
    const dat = await fetchData();
    datas = dat.slice(0, 5);

    datas.forEach((data, index) => {
      // Create slider elements
      const slide = document.createElement("div");
      slide.innerHTML = onRenderSlide(data);

      slide.classList.add("slide");
      slide.style.transform = moveSlideDir(index, currentIndex);

      const dot = document.createElement("div");
      dot.classList.add("dot");
      dot.dataset.index = index;

      dot.addEventListener("click", () => {
        currentIndex = index;
        moveSlidePos();
      });

      dotGroup.appendChild(dot);
      sliderContent.append(slide);
    });

    activateDot();
  }

  prev.addEventListener(
    "click",
    callAll(prevHandler, moveSlidePos, activateDot)
  );
  next.addEventListener(
    "click",
    callAll(nextHandler, moveSlidePos, activateDot)
  );

  loadPhotos();
}
