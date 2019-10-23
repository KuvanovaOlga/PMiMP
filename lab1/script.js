let imgElement = document.getElementById('srcImage');
let inputElement = document.getElementById('fileInput');

inputElement.addEventListener("change", (e) => {
  imgElement.src = URL.createObjectURL(e.target.files[0]);
}, false);

imgElement.onload = function() {
  let mat = cv.imread(imgElement);
  let dst = new cv.Mat();
  cv.cvtColor(mat, dst, cv.COLOR_RGBA2GRAY);
  cv.threshold(dst, dst, 0, 255, cv.THRESH_BINARY | cv.THRESH_OTSU);
  cv.imshow('outputCanvas', dst);
  mat.delete();
}

function opencvIsReady() {
  document.getElementById('status').innerHTML = 'OpenCV.js is ready.'
}
