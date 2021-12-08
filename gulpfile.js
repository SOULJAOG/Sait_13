const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const spritesmith = require('spritesmith');
const {template} = require("browser-sync/dist/config");
const rename = require("gulp-rename");

/* Serer */
gulp.task('server', function() {
    browserSync.init({
        server: {
            port: 9000,
            baseDir: "build"
        }
    });

    gulp.watch('build/**/*').on('change', browserSync.reload);
});

/* Pug compile */
exports.views = () => {
    return src('./src/*.pug')
        .pipe(
            pug({
                // Your options in here.
            })
        )
        .pipe(dest('./dist'));
};

/* Pug compile old */
gulp.task('templates:compile', function buildHTML() {
    return gulp.src('source/template/index.pug')
        .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('build'))
});

/* Styles compile */
gulp.task('styles:compile', function () {
    return gulp.src('source/styles/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename(main.min.css))
        .pipe(gulp.dest('.build/css'));
});

/* Generate our spritesheet */
gulp.task('sprite', function (cb) {
    const spriteData = gulp.src('').pipe(spritesmith({
        imgName: 'sprite.png',
        imgPath: '../images/sprite.png',
        cssName: 'sprite.scss'
    }))
    spriteData.img.pipe(gulp.dest('source/images/'));
    spriteData.css.pipe(gulp.dest('source/styles/global/'));
    cb();
});

gulp.task('clean', function del(cb) {
    return rimraf('build', cd);
});

gulp.task('copy:fonts', function () {
    return gulp.src('./source/fonts/**/*.*')
        .pipe(gulp.src('build/fonts'))
});

gulp.task('copy:images', function () {
    return gulp.src('./source/images/**/*.*')
        .pipe(gulp.src('build/images'))
});

gulp.task('copy', gulp.parallel('copy:fonts','copy:images'));

gulp.task('witch', function () {
    gulp.watch('source/template/**/*.png', gulp.series('templates:compile'));
    gulp.watch('source/styles/**/*.scss', gulp.series('styles:compile'));
});

gulp.task('gulp', gulp.series( 'clean',
    gulp.parallel('templates:compile', 'styles:compile', 'sprite', 'copy'),
    gulp.parallel('watch', 'server')
));