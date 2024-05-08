const { src, dest, watch, series } = require("gulp");
const ts = require("gulp-typescript");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();
const concat = require("gulp-concat");

function compileTypescript() {
  return src("ts/**/*.ts")
    .pipe(
      ts({
        noImplicitAny: true,
        outFile: "main.js",
      })
    )
    .pipe(dest("/js"));
}

function compileSass() {
  return src("sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(concat("main.css"))
    .pipe(autoprefixer())
    .pipe(dest("css"))
    .pipe(browserSync.stream());
}

function watchHtml() {
  return src("*.html");
}

function liveReload() {
  return src("dist/*.html").pipe(browserSync.stream());
}

exports.default = function () {
  watch("ts/*.ts", compileTypescript);
  watch("sass/**/*.scss", compileSass);
  watch("*.html", watchHtml);
  watch("dist/*.html", liveReload);
};
