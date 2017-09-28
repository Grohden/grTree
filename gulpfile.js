const gulp      = require("gulp");
const cache     = require("gulp-cached");
const remember  = require("gulp-remember");
const header    = require("gulp-header");
const footer    = require("gulp-footer");

//Utils
const utils   = require("gulp-util");
const log     = utils.log;
const error   = utils.colors.red;
const info    = utils.colors.magenta;
const success = utils.colors.green;

const templateCache   = require('gulp-angular-templatecache');
const jshint          = require("gulp-jshint");
const babel           = require("gulp-babel");
const concat          = require("gulp-concat");
const sass            = require("gulp-sass");

//App paths
const paths = require("./paths.json");

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

function logError(err) {
  log(error(err.toString()));
  this.emit('end');
}

function compileTemplates() { 
  return gulp
    .src(paths.templates.compile)
    .pipe(templateCache({standalone:true}))
    .pipe(gulp.dest(paths.templates.build));
}

function copyViews() {
  return gulp
    .src(paths.views.compile)
    .pipe(gulp.dest(paths.views.build));
}

/* Tasks */

//Composed and default
gulp.task("default", ["compile"]);
gulp.task("compile", ["compile:scripts","compile:templates", "copy:views"]);

//Compiles
gulp.task("compile:scripts", compileScripts);
gulp.task("compile:templates", compileTemplates);

//Copies
gulp.task("copy:views", copyViews);