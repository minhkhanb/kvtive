var gulp = require ('gulp');
//Require the gulp-sass plugin
var sass = require ('gulp-sass');

var browserSync = require ('browser-sync').create ();

var useref = require ('gulp-useref');

var uglify = require ('gulp-uglify');
var gulpIf = require ('gulp-if');

var cssnano = require ('gulp-cssnano');

var imagemin = require ('gulp-imagemin');

var cache = require ('gulp-cache');

var del = require ('del');

var runSequence = require ('run-sequence');

var src = {
    sass:'app/sass/**/*.+(scss|sass)',
    html:'app/*.html',
    js:'app/js/**/*.js',
    images:'app/images/**/*.+(png|jpg|jpeg|gif|svg)',
    fonts:'app/fonts/**/*'
};
var distination = {
    js:'*.js',
    css:'*.css',
    images:'dist/images',
    fonts:'dist/images'
};

gulp.task ('sass',function () {
    return gulp.src (src.sass)    //accept scss and sass in root and sub folder
    .pipe (sass ())   //Using gulp-sass
    .pipe (gulp.dest ('app/css'))
    .pipe (browserSync.reload ({
        stream:true
    }))
});

gulp.task ('browserSync',function () {
    browserSync.init ({
        server:{
            baseDir:'app'
        }
    });
});

gulp.task ('useref',function () {
    return gulp.src (src.html)
    .pipe (useref ())     //Use for js file at difference folder
    .pipe (gulpIf (distination.js,uglify ()))
    //Minifies only if it's a CSS file
    .pipe (gulpIf (distination.css,cssnano ()))
    .pipe (gulp.dest ('dist'))
});

gulp.task ('images',function () {
    return gulp.src (src.images)
    //Caching images that ran through imagemin
    .pipe (cache (imagemin ({
        //Setting interlaced to true
        interlaced:true //create interlaced GIFs by setting the interlaced option key to true.
    })))
    .pipe (gulp.dest (distination.images))
});

gulp.task ('fonts',function () {
    return gulp.src (src.fonts)
    .pipe (gulp.dest (distination.fonts))
});

gulp.task ('clean',function () {
    return del.sync ('dist');
});

gulp.task ('cache:clear',function (callback) {
    return cache.clearAll (callback)
});

gulp.task ('watch',['browserSync','sass'],function () {
    gulp.watch (src.sass,['sass']);
    //Reloads the browser whenever HTML or JS files change
    gulp.watch (src.html,browserSync.reload);
    gulp.watch (src.js,browserSync.reload);
});

gulp.task ('build',function (callback) {
    runSequence ('clean:dist',
        ['sass','useref','images','fonts'],
        callback
    )
});

gulp.task ('default',function (callback) {
    // place code for your default task here
    runSequence (['sass','browserSync','watch'],
        callback
    )
});

