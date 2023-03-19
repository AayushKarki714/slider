const sliderConfig = {
  async fetchData() {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/photos?albumId=1"
    );
    const data = await res.json();
    return data;
  },
  onRenderSlide(slide) {
    return `
    <img src=${slide.url}/> 
    `;
  },
};

createSlider({
  ...sliderConfig,
  root: document.querySelector("#slider-1"),
  moveSlideDir(index, currentIndex) {
    return `translateX(${(index - currentIndex) * 100}%)`;
  },
});

createSlider({
  ...sliderConfig,
  root: document.querySelector("#slider-2"),
  moveSlideDir(index, currentIndex) {
    return `translateY(${(index - currentIndex) * 100}%)`;
  },
  onRenderSlide(slide) {
    return `
    <p>${slide.title}</p>
   <img src=${slide.url}/> 
    `;
  },
});
