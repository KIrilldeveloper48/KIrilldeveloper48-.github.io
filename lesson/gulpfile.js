"use strict";

const { src, dest } = require("gulp"); // создаём константы (src для чтения, dest для записи)
const gulp = require("gulp");
const autoprefixer = require("gulp-autoprefixer"); //Автоматические префиксы в css
const cssbeautify = require("gulp-cssbeautify"); //Красивый css код
const removeComments = require("gulp-strip-css-comments"); // Удаление комментариев из минифицированного файла css
const rename = require("gulp-rename"); // Переименовывает минифицированные файлы
const sass = require("gulp-sass"); //Компилятор sass
const cssnano = require("gulp-cssnano"); //Минификация css
const rigger = require("gulp-rigger"); //Сборщик js файлов
const uglify = require("gulp-uglify"); //Минификация js файлов
const plumber = require("gulp-plumber"); //Отслеживание ошибок в js
const imagemin = require("gulp-imagemin"); //Сжатие изображений
const del = require("del"); //Удаление лишних файлов
const panini = require("panini"); //Шаблонизатор для html
const browsersync = require("browser-sync").create(); //Локальный сервер

//Указываем все пути
var path = {
  build: {
    html: "dist/",
    js: "dist/assets/js/",
    css: "dist/assets/css/",
    images: "dist/assets/img/"
  }, //Указываем куда помещать готовые файлы
  src: {
    html: "src/*.html",
    js: "src/assets/js/*js",
    css: "src/assets/sass/style.sass",
    images: "src/assets/img/**/*.{jpg,png,svg,gif,ico}"
  }, //Указываем откуда брать исходники
  watch: {
    html: "src/**/*.html",
    js: "src/assets/js/**/*js",
    css: "src/assets/sass/**/*.sass",
    images: "src/assets/img/**/*.{jpg,png,svg,gif,ico}"
  }, //Указываем за какими файлами нужно наблюдать
  clean: "./dist" //Очищение папки дист, перед загрузкой новых файлов
};

//Таски

//Запускаем локальный сервер
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./dist"
    },
    port: 3000
  });
}

function browserSyncReload(done) {
  browsersync.reload();
}

//Таск html
function html() {
  panini.refresh();
  return src(path.src.html, {
    base: "src/"
  })
    .pipe(plumber())
    .pipe(
      panini({
        root: "src/", //В этой папке располагаются основные страницы сайта
        layouts: "src/tpl/layouts/", //В этой папке хранятся шаблоны
        partials: "src/tpl/partials/", //В этой папке отдельные фрагменты кода (меню, футер и т.д.)
        helpers: "src/tpl/helpers/",
        data: "src/tpl/data/" //В этой папке хранятся данные
      })
    )
    .pipe(dest(path.build.html))
    .pipe(browsersync.stream());
}

//Таск css
function css() {
  return src(path.src.css, {
    base: "src/assets/sass/"
  })
    .pipe(plumber())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(cssbeautify())
    .pipe(dest(path.build.css))
    .pipe(
      cssnano({
        zindex: false
      })
    )
    .pipe(removeComments())
    .pipe(
      rename({
        suffix: ".min",
        extanme: ".css"
      })
    )
    .pipe(dest(path.build.css))
    .pipe(browsersync.stream());
}

//Таск js
function js() {
  return src(path.src.js, {
    base: "src/assets/js/"
  })
    .pipe(plumber())
    .pipe(rigger())
    .pipe(gulp.dest(path.build.js))
    .pipe(uglify())
    .pipe(
      rename({
        suffix: ".min",
        extname: ".js"
      })
    )
    .pipe(dest(path.build.js))
    .pipe(browsersync.stream());
}

//Таск img
function images() {
  return src(path.src.images)
    .pipe(imagemin())
    .pipe(dest(path.build.images));
}

//Очищаем папку dist
function clean() {
  return del(path.clean);
}

//Отслеживаем все файлы и запускам соответствующие таски
function watchFiles() {
  gulp.watch([path.watch.html], html);
  gulp.watch([path.watch.css], css);
  gulp.watch([path.watch.js], js);
  gulp.watch([path.watch.images], images);
}

const build = gulp.series(clean, gulp.parallel(html, css, js, images)); //Задаём последовательность действий
const watch = gulp.parallel(build, watchFiles, browserSync);

//Экспорт таксков (необходмо для их работы)
exports.html = html;
exports.css = css;
exports.js = js;
exports.images = images;
exports.clean = clean;
exports.build = build;
exports.watch = watch;
exports.default = watch;
