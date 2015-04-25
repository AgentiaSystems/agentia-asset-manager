'use strict';

var gulp = require('gulp');
var mocha = require('gulp-mocha');
var istanbul = require('gulp-istanbul');
var eslint = require('gulp-eslint');
var git = require('gulp-git');
var bump = require('gulp-bump');
var argv = require('yargs').argv;
var fs = require('fs');

var files = {
  root: './',
  pkg: './package.json',
  src: [
    './index.js',
    './lib/**/*.js'
  ],
  test: [
    './test/**/*.spec.js'
  ]
};

var getPackageJson = function () {
  /*eslint-disable*/
  return JSON.parse(fs.readFileSync(files.pkg, 'utf8'));
  /*eslint-enable*/
};

gulp.task('lint', function () {
  return gulp.src(files.src.concat(files.test))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
});

gulp.task('test', function () {
  return gulp.src(files.test, { read: false })
    .pipe(mocha({ reporter: 'dot' }));
});

gulp.task('spec', function () {
  return gulp.src(files.test, { read: false })
    .pipe(mocha({ reporter: 'spec' }));
});

gulp.task('coverage', function (done) {
  gulp.src(files.src)
    .pipe(istanbul())
    .pipe(istanbul.hookRequire())
    .on('finish', function () {
      gulp.src(files.test)
        .pipe(mocha({ reporter: 'dot' }))
        .pipe(istanbul.writeReports({
          dir: './coverage',
          reporters: ['lcov', 'json', 'html'],
          reportOpts: { dir: './coverage' }
        }))
        .on('end', done);
    });
});

gulp.task('bump', function() {
  var versioning = function() {
    if (argv.minor || argv.feature) {
      return 'minor';
    }
    if (argv.major) {
      return 'major';
    }
    return 'patch';
  };

  return gulp.src(files.pkg)
    .pipe(bump({ type: versioning() }))
    .pipe(gulp.dest(files.root))
    .on('end', function() {
      var pkg = getPackageJson();
      var msg = 'chore(version): bumped version to ' + pkg.version;
      gulp.src(files.pkg)
        .pipe(git.commit(msg));
    });
});
