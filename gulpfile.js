const gulp = require('gulp')
const babel = require('gulp-babel')
const nodemon = require('gulp-nodemon')
const changed = require('gulp-changed')


const compile = (name) => {
  const dest = `build/${name}`
  gulp.task(`compile-${name}`, () => {
    gulp.src(`${name}/**/*.js`)
    .pipe(changed(dest))
    .pipe(babel({
      presets: ['es2015']
    }))
  .pipe(gulp.dest(dest))
  })

  gulp.task(`watch-${name}`, () => {
    gulp.watch(`${name}/**/*.js`, [`compile-${name}`])
  })
}

compile('src')
compile('test')

gulp.task('compile', ['compile-src', 'compile-test'])

gulp.task('watch', ['watch-src', 'watch-test'])

gulp.task('dev', ['compile', 'watch'], () => {
  nodemon({
    verbose: true,
    script: 'build/src/server/server.js',
    ignore: [`${process.cwd()}/src/**`]
  })
})

gulp.task('default', ['compile'])
