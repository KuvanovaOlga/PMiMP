let imgElement = document.getElementById("srcImage");
let inputElement = document.getElementById("fileInput");

inputElement.addEventListener(
  "change",
  e => {
    imgElement.src = URL.createObjectURL(e.target.files[0]);
  },
  false
);

imgElement.onload = function() {
  // свертка
  let mat = cv.imread(imgElement);
  let dst = new cv.Mat();
  let M = cv.Mat.eye(3, 3, cv.CV_32FC1);
  console.log(M);
  let anchor = new cv.Point(-1, -1);
  // 0 - добавочная интенсивность
  cv.filter2D(mat, dst, cv.CV_8U, M, anchor, 0, cv.BORDER_DEFAULT);
  cv.imshow("convolution", dst);

  // сглаживание
  let ksize = new cv.Size(3, 3); // размер ядра для размытия
    cv.blur(mat, dst, ksize, anchor, cv.BORDER_DEFAULT);
  cv.imshow("blur", dst);

  cv.boxFilter(mat, dst, -1, ksize, anchor, true, cv.BORDER_DEFAULT);
  cv.imshow("boxFilter", dst);

  cv.GaussianBlur(mat, dst, ksize, 0, 0, cv.BORDER_DEFAULT);
  cv.imshow("gaussianBlur", dst);

  cv.medianBlur(mat, dst, 5);
  cv.imshow("medianBlur", dst);

  M = cv.Mat.ones(5, 5, cv.CV_8U);
  cv.erode(
    mat,
    dst,
    M,
    anchor,
    1, // количество раз применения
    cv.BORDER_CONSTANT,
    cv.morphologyDefaultBorderValue()
  );
  cv.imshow("erosion", dst);

  cv.dilate(
    mat,
    dst,
    M,
    anchor,
    1,
    cv.BORDER_CONSTANT,
    cv.morphologyDefaultBorderValue()
  );
  cv.imshow("dilation", dst);

  // 50 100 - пороговые значения для отсечения
  // 3 - размер ядра
  cv.Canny(mat, dst, 50, 100, 3, false);
  cv.imshow("canny", dst);

  cv.cvtColor(mat, mat, cv.COLOR_RGBA2GRAY, 0);
  cv.equalizeHist(mat, dst);
  cv.imshow("hist", dst);

  mat.delete();
  dst.delete();
  M.delete();
};

function opencvIsReady() {
  document.getElementById("status").innerHTML = "OpenCV.js is ready.";
}
