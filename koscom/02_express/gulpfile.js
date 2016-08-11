var gulp = require("gulp"),
    jshint = require("gulp-jshint");


gulp.task("jshint", function() {
  gulp
    .src("./*.js")
    .pipe(jshint())
    .pipe(jshint.reporter());
});