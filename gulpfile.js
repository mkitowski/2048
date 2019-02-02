var gulp = require('gulp');
var sass = require('gulp-sass');
gulp.task('sass', function() {
    return gulp.src('./scss/*.scss')
    //.pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'compressed',
            errLogToConsole: true
        }))
        // .pipe(sourcemaps.write())
        .pipe(gulp.dest('css'))
});
gulp.task('watch', function() {
    gulp.watch('./scss/**/*.scss', gulp.series('sass'));
});