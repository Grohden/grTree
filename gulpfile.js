const gulp = require("gulp");
const cache = require("gulp-cached");
const remember = require("gulp-remember");
const header = require("gulp-header");
const footer = require("gulp-footer");

//Utils
const browserSync = require('browser-sync').create();
const bsConfigs = require("./bs-config.js");
const utils = require("gulp-util");
const log = utils.log;
const error = utils.colors.red;
const info = utils.colors.magenta;
const success = utils.colors.green;

const templateCache = require('gulp-angular-templatecache');
const jshint = require("gulp-jshint");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const sass = require("gulp-sass");



//node
const del = require("del");

//App paths
const paths = require("./files.json");


function deletionHandler(cacheName){
  return function(event){
    //Remove a file do cache se deletada.
      if (event.type === 'deleted') {
        delete cache.caches[cacheName][event.path];
        remember.forget(cacheName, event.path);
      }
  }
};

//Some util functions
function logError(err) {
  log(error(err.toString()));
  this.emit('end');
}

/* Task definitions */

function compileScripts(event) {
  log(info("compiling scripts"));

  return gulp
    .src(paths.scripts.compile)
    .pipe(cache(paths.scripts.cacheName))
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'))
    .pipe(babel())
    .on("error", logError)
    .pipe(header("(function(){\n"))
    .pipe(footer("\n}());"))
    .pipe(remember(paths.scripts.cacheName))
    .pipe(concat('app.js'))
    .pipe(gulp.dest(paths.scripts.build));
}

function compileTemplates() {
  return gulp
    .src(paths.templates.compile)
    .pipe(templateCache({ standalone: true }))
    .pipe(gulp.dest(paths.templates.build));
}

function compileSass() {
  return gulp
    .src(paths.styles.compile)
    .pipe(cache(paths.styles.cacheName))
    .pipe(sass().on("error", sass.logError))
    .pipe(remember(paths.styles.cacheName))
    .pipe(concat('app.css'))
    .pipe(gulp.dest(paths.styles.build));

}

function copyIcons() {
  return gulp
    .src(paths.icons.source)
    .pipe(gulp.dest(paths.icons.build));
}

function copyViews() {
  return gulp
    .src(paths.views.compile)
    .pipe(gulp.dest(paths.views.build));
}

//FIXME: handle deletion for cache

function watchScripts() {
  return gulp
      .watch(paths.scripts.compile, ['compile:scripts'])
      .on('change', deletionHandler(paths.scripts.cacheName));
}

function watchTemplates() {
  return gulp.watch(paths.templates.compile, ['compile:templates']);
}

function watchViews() {
  return gulp.watch(paths.views.compile, ['copy:views']);
}

function watchSass() {
  return gulp.watch(paths.styles.compile, ['compile:sass']);
}

function initBrowserSync() {
  browserSync.init(bsConfigs);
}

//Clear all folders except the vendor ones (which are created by bower)
function clearBuild() {
  return del(paths.clean);
}

/* Tasks */

//Composed and default and others
gulp.task("default", ["compile"]);
gulp.task("clear", clearBuild);

//General
gulp.task("compile", [
  "clear",
  "compile:scripts",
  "compile:sass",
  "compile:templates",
  "copy:views",
  "copy:icons"
]);

gulp.task("watch", [
  "compile",
  "browser-sync",
  "watch:scripts",
  "watch:sass",
  "watch:templates",
  "watch:views"
]);

gulp.task('browser-sync', initBrowserSync)

//Compiles
gulp.task("compile:scripts", compileScripts);
gulp.task("compile:sass", compileSass);
gulp.task("compile:templates", compileTemplates);

//Copies
gulp.task("copy:views", copyViews);
gulp.task("copy:icons",copyIcons);

//Watchers
gulp.task("watch:scripts", watchScripts);
gulp.task("watch:templates", watchTemplates);
gulp.task("watch:views", watchViews);
gulp.task("watch:sass", watchSass);
