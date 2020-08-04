
const gulp = require('gulp');

const clean = require('gulp-clean');
const plumber = require("gulp-plumber");
const terser = require('gulp-terser');
const nodemon = require('gulp-nodemon');
const ts = require('gulp-typescript');

const config = require('./gulp/config');
const tsProject = ts.createProject('tsconfig.json');

// Tarea que borra el directorio destino
gulp.task('clean', () => {
    return gulp.src(config.clean.src, { allowEmpty: true, read: false })
        .pipe(plumber())
        .pipe(clean());
});

// Tarea que se ejecuta cuando se detectan cambios
gulp.task('compile', () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(config.server.tmp));
});

gulp.task('compress', () => {
    return gulp.src(config.server.jsSrc)
        .pipe(terser())
        .pipe(gulp.dest(config.server.dest));
});

gulp.task('clean:temporal', () => {
    return gulp.src(config.server.tmp, { allowEmpty: true, read: false })
        .pipe(plumber())
        .pipe(clean());
});

gulp.task('init-dev', () => {
    let stream = nodemon({
        exec: 'node --inspect=9229',
        script: config.server.src,
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });
 

    stream.on('crash', function () {
        console.error('Application has crashed!\n');
        stream.emit('restart', 10);  // restart the server in 10 seconds
    });
});

gulp.task('init-local', () => {
    let stream = nodemon({
        exec: 'node --inspect=9229',
        script: config.server.src,
        ext: 'js',
        env: { 'NODE_ENV': 'development' }
    });

    stream.on('crash', function () {
        console.error('Application has crashed!\n');
        stream.emit('restart', 10);  // restart the server in 10 seconds
    });
});

gulp.task('build-prod', gulp.series('compile', 'compress', 'clean:temporal'), () => {
    console.console.log('App build!');
});

// Tarea para generar el swagger
gulp.task('swaggerFile', () => {
    return gulp.src(config.swagger.src).pipe(gulp.dest(config.swagger.dest));
});

// Set up a watcher to watch over changes
// gulp.task('watch', () => {
//     gulp.watch('server/**/*.ts', gulp.series('scripts'));
// });

gulp.task('compile-dev', () => {
    const tsResult = tsProject.src().pipe(tsProject());
    return tsResult.js.pipe(gulp.dest(config.server.dest));
});

gulp.task('build-dev', gulp.series('compile-dev', 'clean:temporal'), () => {
    console.console.log('App build!');
});

gulp.task('default', gulp.series('clean', gulp.parallel('build-prod', 'swaggerFile')));
gulp.task('prod', gulp.series('clean', gulp.parallel('build-prod', 'swaggerFile')));
gulp.task('start-dev', gulp.series('clean', gulp.parallel('build-dev', 'swaggerFile'), 'init-dev'));
gulp.task('start-local', gulp.series('clean', gulp.parallel('build-dev', 'swaggerFile'), 'init-local'));
