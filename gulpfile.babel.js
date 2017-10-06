import del from "del";
import gulp from "gulp";
import utils from "gulp-util";
import sass from "gulp-sass";
import babel from "gulp-babel";
import cache from "gulp-cached";
import concat from "gulp-concat";
import jshint from "gulp-jshint";
import remember from "gulp-remember";
import templateCache from "gulp-angular-templatecache";

//Utils
const browserSync = require('browser-sync').create();
const bsConfigs = require("./bs-config.js");
const log = utils.log;
const error = utils.colors.red;
const info = utils.colors.magenta;
const success = utils.colors.green;

const paths = require("./files.json"); //App paths

function deletionHandler(cacheName){
  return function(event){
    //Remove a file do cache se deletada.
      if (event.type === 'deleted') {
        delete cache.caches[cacheName][event.path];
        remember.forget(cacheName, event.path);
      }
  };
}

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
function clearBuild( callback) {
  del.sync(paths.clean);
  callback();
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
]);

gulp.task("watch", [
  "compile",
  "watch:scripts",
  "watch:sass",
  "watch:templates",
  "watch:views",
  "browser-sync"
]);

gulp.task('browser-sync', initBrowserSync);

//Compiles
gulp.task("compile:scripts", compileScripts);
gulp.task("compile:sass", compileSass);
gulp.task("compile:templates", compileTemplates);

//Copies
gulp.task("copy:views", copyViews);

//Watchers
gulp.task("watch:scripts", watchScripts);
gulp.task("watch:templates", watchTemplates);
gulp.task("watch:views", watchViews);
gulp.task("watch:sass", watchSass);
