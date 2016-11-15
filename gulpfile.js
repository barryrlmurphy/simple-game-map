var gulp = require('gulp');
var sass = require("gulp-sass");
var notify = require("gulp-notify");
var eslint = require("gulp-eslint");

const paths = {
  scssSrc: 'styles/sass/**/*.scss',
  cssDist: 'styles/css/',
  jsSrc: 'js/**/*.js',
};

gulp.task('dev', ['watch', 'build']);

gulp.task('watch', function() {
  gulp.watch([
    paths.scssSrc,
    paths.jsSrc
  ], ['lint', 'build']);
});

gulp.task('build', ['lint', 'generate-styles']);

gulp.task('generate-styles', function() {
	return gulp.src(paths.scssSrc)
		.pipe(sass().on('error', sass.logError))
    	.pipe(gulp.dest(paths.cssDist))
    	.pipe(notify('SASS success :)'))
});

gulp.task('lint', function() {
    return gulp.src([
  		paths.jsSrc,
  		'!node_modules/**'
    ])
  		.pipe(eslint({'rules': {
        'quotes': [1, 'single'],
        'semi': [1, 'always']
      }}))
  		.pipe(eslint.format())
		.pipe(eslint.failAfterError())
});
