// Note below are required for gulp sass compilation and browser sync
let gulp = require('gulp');
let browserSync = require('browser-sync').create();
let sass = require('gulp-sass');
let notify = require('gulp-notify');

//Note move fonts from font awesome to our src assets/font directory

gulp.task('fonts', function () {
    return gulp.src(['node_modules/@fortawesome/fontawesome-free/webfonts/**.*'])
        .pipe(gulp.dest('src/webfonts')).pipe(browserSync.stream());
});

// Note Compile sass into CSS and auto-inject into browsers
gulp.task('sass', function () {
    return gulp.src(['node_modules/bootstrap/scss/bootstrap.scss', 'src/scss/*.scss',
        'node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss',
        'node_modules/@fortawesome/fontawesome-free/scss/brands.scss',
        'node_modules/@fortawesome/fontawesome-free/scss/regular.scss'])
        .pipe(sass()).on('error', notify.onError(function (error) {
            return "Error: " + error.message;
        }))
        .pipe(gulp.dest('src/css'))
        .pipe(browserSync.stream());
});

// Note move the javscript folders into our src/js folder
gulp.task('js', function () {
    return gulp.src(['node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/@fortawesome/fontawesome-free/js/fontawesome.js',
        'node_modules/@fortawesome/fontawesome-free/js/brands.js',
        'node_modules/@fortawesome/fontawesome-free/js/regular.js',
        'node_modules/jquery/dist/jquery.js',
        'node_modules/popper/dist/popper.js'])
        .pipe(gulp.dest('src/js'))
        .pipe(browserSync.stream());
});

//Note Static Server + watching scss/html
gulp.task('serve', ['sass'], function () {

    browserSync.init({
        server: './src'
    });

    gulp.watch(['node_modules/bootstrap/scss/bootstrap.scss',
        'node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss',
        'node_modules/@fortawesome/fontawesome-free/scss/brands.scss',
        'node_modules/@fortawesome/fontawesome-free/scss/regular.scss',
        'src/scss/*.scss'], ['sass']);
    gulp.watch("src/*.html").on('change', browserSync.reload);

});

gulp.task('default', ['js', 'serve', 'fonts']);