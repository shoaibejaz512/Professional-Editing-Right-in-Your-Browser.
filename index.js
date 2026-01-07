let filters = {
  brightness: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  contrast: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  Saturation: {
    value: 100,
    min: 0,
    max: 200,
    unit: "%",
  },
  HueRotate: {
    value: 0,
    min: 0,
    max: 360,
    unit: "deg",
  },
  blur: {
    value: 0,
    min: 0,
    max: 20,
    unit: "px",
  },
  GrayScale: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
  Sepia: {
    value: 0,
    min: 0,
    max: 200,
  },
  Opacity: {
    value: 100,
    min: 0,
    max: 100,
    unit: "%",
  },
  Invert: {
    value: 0,
    min: 0,
    max: 100,
    unit: "%",
  },
};

const imageCanvas = document.querySelector("#image-canvas");
const ctx = imageCanvas.getContext("2d");
const imgInput = document.querySelector("#image-input");
let AllFilters = document.querySelector(".filters");
let resetBtn = document.querySelector("#reset-btn");
let downloadBtn = document.querySelector("#download-btn")
let presetsContainer = document.querySelector(".presets");
let file = null;
let img = null;

function createFilterElement(name, unit = "%", min, max, value) {
  let div = document.createElement("div");
  div.classList.add("filter");

  let p = document.createElement("p");
  p.innerText = name;
  let input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.id = name;
  input.value = value;

  input.addEventListener("input", (e) => {
    filters[name].value = input.value;
    applyFiltes();
  });

  div.appendChild(p);
  div.appendChild(input);

  return div;
}

function createFilter() {
  Object.keys(filters).forEach((filter) => {
    let name = filter;
    let unit = filters[filter].unit;
    let min = filters[filter].min;
    let max = filters[filter].max;
    let value = filters[filter].value;

    let filterElement = createFilterElement(name, unit, min, max, value);
    AllFilters.appendChild(filterElement);
  });
}

createFilter();

imgInput.addEventListener("change", (e) => {
  imageCanvas.style.display = "block";
  file = e.target.files[0];
  const imagePlaceHolder = document.querySelector(".placeholder");
  imagePlaceHolder.style.display = "none";
  image = new Image();
  image.src = URL.createObjectURL(file);
  image.onload = () => {
    imageCanvas.width = 800;
    imageCanvas.height = 450;
    img = image;
    ctx.drawImage(image, 0, 0, imageCanvas.width, imageCanvas.height);
  };
});

function applyFiltes() {
  if (!img) return; // 🔥 image load nahi hui to kuch mat karo
  ctx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);

  let filterString = `
    brightness(${filters.brightness.value}%)
    contrast(${filters.contrast.value}%)
    saturate(${filters.Saturation.value}%)
    hue-rotate(${filters.HueRotate.value}deg)
    blur(${filters.blur.value}px)
    grayscale(${filters.GrayScale.value}%)
    sepia(${filters.Sepia.value}%)
    opacity(${filters.Opacity.value}%)
    invert(${filters.Invert.value}%)
  `.trim();

  ctx.filter = filterString;
  ctx.drawImage(img, 0, 0, imageCanvas.width, imageCanvas.height);
}

resetBtn.addEventListener("click", () => {
  filters = {
    brightness: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    contrast: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    Saturation: {
      value: 100,
      min: 0,
      max: 200,
      unit: "%",
    },
    HueRotate: {
      value: 0,
      min: 0,
      max: 360,
      unit: "deg",
    },
    blur: {
      value: 0,
      min: 0,
      max: 20,
      unit: "px",
    },
    GrayScale: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
    Sepia: {
      value: 0,
      min: 0,
      max: 200,
    },
    Opacity: {
      value: 100,
      min: 0,
      max: 100,
      unit: "%",
    },
    Invert: {
      value: 0,
      min: 0,
      max: 100,
      unit: "%",
    },
  };

  applyFiltes();
  AllFilters.innerHTML = "";
  createFilter();
});

downloadBtn.addEventListener("click",() => {
  if(!img){
    return;
  }
  let link = document.createElement("a");
  link.download = "edit-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
})


let presets = {
  drama:{
    brightness:110,
    contrast:130,
    Saturation:120,
    HueRotate:0,
    blur:0,
    GrayScale:10,
    Sepia:0,
    Opacity:100,
    Invert:0
  },
  vitage:{
    brightness:90,
    contrast:110,
    Saturation:80,
    HueRotate:15,
    blur:0,
    GrayScale:20,
    Sepia:40,
    Opacity:100,
    Invert:0
  },
  oldSchool:{
    brightness:95,
    contrast:120,
    Saturation:60,
    HueRotate:0,
    blur:0,
    GrayScale:50,
    Sepia:30,
    Opacity:100,
    Invert:0
  },
  cyberPunk:{
    brightness:110,
    contrast:140,
    Saturation:160,
    HueRotate:290,
    blur:0,
    GrayScale:0,
    Sepia:0,
    Opacity:100,
    Invert:0
  },
  softGlow:{
    brightness:120,
    contrast:90,
    Saturation:110,
    HueRotate:0,
    blur:2,
    GrayScale:0,
    Sepia:10,
    Opacity:100,
    Invert:0
  },
  noir:{
    brightness:80,
    contrast:130,
    Saturation:0,
    HueRotate:0,
    blur:0,
    GrayScale:100,
    Sepia:10,
    Opacity:100,
    Invert:0
  },
  warmSunset:{
    brightness:105,
    contrast:115,
    Saturation:120,
    HueRotate:20,
    blur:0,
    GrayScale:0,
    Sepia:30,
    Opacity:100,
    Invert:0
  },
  coolTone:{
    brightness:100,
    contrast:110,
    Saturation:90,
    HueRotate:200,
    blur:0,
    GrayScale:5,
    Sepia:0,
    Opacity:100,
    Invert:0
  },
  faded:{
    brightness:105,
    contrast:80,
    Saturation:70,
    HueRotate:0,
    blur:0,
    GrayScale:10,
    Sepia:20,
    Opacity:100,
    Invert:0
  },
  retraPop:{
    brightness:115,
    contrast:130,
    Saturation:150,
    HueRotate:45,
    blur:0,
    GrayScale:0,
    Sepia:0,
    Opacity:100,
    Invert:0
  },

}

function createPresets(){
  Object.keys(presets).forEach((presetName) => {
    let prsetBtn = document.createElement("button");
    prsetBtn.innerText = presetName;
    prsetBtn.classList.add("btn")
    presetsContainer.appendChild(prsetBtn)

    prsetBtn.addEventListener("click",() => {
      let preset = presets[presetName];
      console.log(preset)
      Object.keys(preset).forEach((filterName) => {
        filters[filterName].value = preset[filterName];
      })

      applyFiltes()
      AllFilters.innerHTML = "";
      createFilter()
    })
  })
}

createPresets()