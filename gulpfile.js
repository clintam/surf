const gulp = require('gulp')
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')
const changed = require('gulp-changed')
const sourcemaps = require('gulp-sourcemaps')



gulp.task('compile', () => {
  var dest = 'build'
  gulp.src('src/**/*.js')
    .pipe(changed(dest))
    .pipe(sourcemaps.init({ debug: true }))
    .pipe(babel({
      sourceMaps: false,
      presets: ['es2015']
    }))
    .on('error', console.error.bind(console)) // Consider to faile fast if not watching
    .pipe(sourcemaps.write('.', {
      sourceRoot: function (file) {
        // ? Workaround to make source maps work in vs code
        const segs = file.path.substring(file.base.length, file.path.length).split('/').length
        const backups = '../'.repeat(segs)
        return `${backups}src`
      }
    }))
    .pipe(gulp.dest(dest))
})

gulp.task('watch', () => {
  gulp.watch(['src/**/*.js', 'test/**/*.js'], ['compile'])
})

gulp.task('dev', ['compile', 'watch'], () => {
  nodemon({
    verbose: true,
    exec: 'node --debug',
    script: 'build/server/server.js',
    ignore: [
      `${process.cwd()}/src/**`,
      `${process.cwd()}/build/**/*.spec.js`,
      `${process.cwd()}/build/web/**`,
      `${process.cwd()}/build/fvt/**`,
      `${process.cwd()}/build/ui-fvt/**`
    ]
  })
})

gulp.task('default', ['compile'])
