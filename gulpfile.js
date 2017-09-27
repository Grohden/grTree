const gulp      = require("gulp");
const cache     = require("gulp-cached");
const remember  = require("gulp-remember");

//Utils
const utils     = require("gulp-util");
const log       = utils.log; 
const error     = utils.colors.red;
const info      = utils.colors.magenta;
const success   = utils.colors.green;

const jshint    = require("gulp-jshint");
const babel     = require("gulp-babel");
const concat    = require("gulp-concat");
const sass      = require("gulp-sass");



const helpers = (function(){
    function basePathConstructor(path){
        return (x) => x ? path + x : path;
    }
    
    const src = basePathConstructor('./src/');
    const dest = basePathConstructor('./build/');
    const scriptsSrc = basePathConstructor(src('scripts/'));
    const scriptsDest = basePathConstructor(dest('scripts/'));

    return {
        src,
        dest,
        scripts: {
            cacheName: () => "scripts",
            src: scriptsSrc,
            dest: scriptsDest,
            compile : () => [scriptsSrc('**/*js'), scriptsSrc('*.js')] 
        },
    }
}())


/* Definições das tasks */

function compileScripts(event){
    log(info("compiling scripts"));

    return gulp
        .src(helpers.scripts.compile())
        .pipe(cache(helpers.scripts.cacheName()))
        .pipe(jshint())
		.pipe(jshint.reporter('jshint-stylish'))
        .pipe(babel())
        // Prefiro não concatenar os fontes, mas caso nescessario é so descomentar o rember e adicionar um concat.
        .pipe(remember(helpers.scripts.cacheName())) 
        .pipe(gulp.dest(helpers.scripts.dest()));
}

/* Tasks */

gulp.task("default",["compile"]);

gulp.task("compile", compileScripts);
