const gulp = require("gulp");
const browserSync = require("browser-sync");
const scss = require("gulp-sass");
const rename = require("gulp-rename");
const autoprefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");

// Static server
gulp.task("server", function () {
  //delaet func chtoby zapuskat live server(!!na lokalnoy sieti. to est lyuboy device na etoy wi-fi sietu smozhet zayti na seerver po etomu adresu!!)
  browserSync({
    server: {
      baseDir: "src",
    },
  });
  gulp.watch("src/*.html").on("change", browserSync.reload);
});

gulp.task("styles", function () {
  //delaet func chtoby scss v cssixer())
  return gulp
    .src("src/scss/**/*.scss")
    .pipe(scss({ outputStyle: "compressed" }).on("error", scss.logError))
    .pipe(
      rename({
        prefix: "",
        suffix: ".min",
      })
    )
    .pipe(autoprefixer())
    .pipe(
      cleanCSS({
        compatibility: "ie8",
      })
    )
    .pipe(gulp.dest("src/css"))
    .pipe(browserSync.stream());
});

gulp.task("watch", function () {
  // delat tak, chtoby vse faily izmenalis i kompelirovalis v rezhime realnoho vremeni
  gulp.watch("src/scss/**/*.scss", gulp.parallel("styles"));
});

gulp.task("default", gulp.parallel("watch", "server", "styles"));
