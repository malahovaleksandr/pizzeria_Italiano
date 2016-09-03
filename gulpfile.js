
var gulp = require('gulp'),
    autoprefixer = require('gulp-autoprefixer'),//добавим префиксы для css
    sass = require('gulp-sass'),//перегоним из scss в css
    sourcemaps = require('gulp-sourcemaps'),//прописываем ресурсные карты
    browserify = require('gulp-browserify'),//для псборки файла js со всеми зависимостями в один файл
    watch = require('gulp-watch'),//следит за изменениями
    jade = require('gulp-jade'),//перегоняет из jade в html
    browserSync = require('browser-sync'),// для отладки создает сервер и можно редактировать страницы
    svgSprite= require('gulp-svg-sprite'),// собирает спрайт из свг
    svgmin = require('gulp-svgmin'),//минифицирует свг файлы, убирая не нужные атрибуты , такие как fiil
    minify = require('gulp-minify'),// для минификации js файла
    concat = require('gulp-concat'),// конкат для js

   

    clean = require('gulp-clean');//перед запуском удаляет старые файлы
    


global.$={
    config: require('./gulp/config')
};
///подключаем SCSS
gulp.task('scss', function () {
    return gulp.src($.config.paths.scss.src)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer($.config.autoprefixerConfig))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest($.config.paths.scss.dist))
        .pipe(browserSync.stream());

});
//минимизация картинок

// подключаем спрайт svg
gulp.task('svg_sprite', function() {
    gulp.src($.config.paths.svg.src)
        .pipe(svgmin({
            plugins: [
                {
                    removeAttrs: {
                        attrs: [
                            'fill',
                            'stroke',
                            'stroke-width',
                            'style'
                        ]
                    }
                }
            ]
        }))
        .pipe(svgSprite($.config.spriteSvgConfig))
        .pipe(gulp.dest($.config.paths.svg.dist));
});
///подключаем JS c помощью broserfy
gulp.task('js_process', function() {
       gulp.src($.config.paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
       .pipe(browserify())
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest($.config.paths.js.dist))
});
///собираем  JS в один файл с мапами
gulp.task('scripts', function() {
    return gulp.src($.config.paths.js.src)
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(minify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest($.config.paths.js.dist));
});
///подключаем JADE
gulp.task('jade', function() {
    var YOUR_LOCALS = {};
    gulp.src($.config.paths.jade.src)
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty:'\t'
        }))
        .pipe(gulp.dest($.config.paths.jade.dist))
        .pipe(browserSync.stream());
});
///подключаем JADE INDEX.HTML
gulp.task('jadeIndex', function() {
    var YOUR_LOCALS = {};
    gulp.src($.config.paths.jade.srcIndex)
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty:'\t'
        }))
        .pipe(gulp.dest($.config.paths.jade.distIndex))
        .pipe(browserSync.stream());
});
///подключаем JADEPHP INDEX.HTML to Index.php выбираю каким лучше компилировать в php
gulp.task('jadePhp', function() {
    var YOUR_LOCALS = {};
    gulp.src($.config.paths.jade.srcIndex)
        .pipe(jadePhp({
            locals: YOUR_LOCALS,
            pretty:'\t'
        }))
        .pipe(gulp.dest($.config.paths.jade.distIndex))
        .pipe(browserSync.stream());
});
///подключаем WATCH
gulp.task('watch', function () {

    gulp.watch($.config.paths.jade.srcWatch, ['jade']).on('change', browserSync.reload);
    gulp.watch($.config.paths.jade.srcIndex, ['jadeIndex']).on('change', browserSync.reload);
    gulp.watch($.config.paths.jade.srcWatchAdd, ['jade']).on('change', browserSync.reload);
    gulp.watch($.config.paths.watch.src, ['scss']).on('change', browserSync.reload);
    gulp.watch($.config.paths.svg.src, ['svg_sprite']).on('change', browserSync.reload);
    gulp.watch($.config.paths.js.src, ['scripts']).on('change', browserSync.reload);
});
///подключаем Server
gulp.task('serve', function() {
    browserSync.init({
        server: "./public"
    });
});
///подключаем Clean
gulp.task('clean', function () {
           return gulp.src($.config.clean, {read: false})
            .pipe(clean());
});

gulp.task('default', [ 'watch','scss','jade','scripts','jadeIndex','svg_sprite','serve']);
// gulp.task('default', gulp.series(
//     'clean',
//     gulp.parallel(
//         'scss',
//         'jade',
//         'js_process',
//         'jadeIndex',
//         'svg_sprite',
//         'sprite:svg'
//     ),
//     gulp.parallel(
//         'watch',
//         'serve'
//     )
// ));