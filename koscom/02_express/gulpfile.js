var gulp = require("gulp");
var jshint = require("gulp-jshint");
var watch = require("gulp-watch");
var bower = require("gulp-bower");


// npm install -g gulp jshint
// npm install --save-dev gulp jshint gulp-jshint

gulp.task("jshint", function() {
  gulp
    .src("./app.js")
    .pipe(jshint())
    .pipe(jshint.reporter());
});

// scaffolding => yoeman
// build => grunt, gulp
// client library depency => bower ( bootstrap, jquery, ... )
// client => browerify, webpack, ...

gulp.task("watch", function() {
  gulp.watch("app.js", ["jshint"]);
});


gulp.task("bower", function() {
  bower();
});


gulp.task("default", ["bower", "watch"])