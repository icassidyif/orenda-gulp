const { series, parallel, watch, src, dest } = require('gulp');
const gulpPug = require('gulp-pug');
const gulpPlumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const sourcemaps = require('gulp-sourcemaps');
const del = require('del');
const browserSync = require('browser-sync').create();

const gulpWebpHtml = require('gulp-webp-html');
const gulpPrettyHtml = require('gulp-pretty-html');

const gulpSass = require('gulp-sass')(require('sass'));
const postCss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const mqPacker = require('css-mqpacker');
const webpCss = require('gulp-webp-css');

const webpackStream = require('webpack-stream');

const imagemin = require('gulp-imagemin');
const svgSprite = require('gulp-svg-sprite');
const svgmin = require('gulp-svgmin');
const cheerio = require('gulp-cheerio');
const replace = require('gulp-replace');
const webp = require('gulp-webp');

// CONFIG------------------------------------------------------------
let isProd = false;

const toProd = (done) => {
  isProd = true;
  done();
};

// WEBPACK CONFIG
const webpackConfig = {
  mode: !isProd? 'development' : 'production',

  output: {
    filename: '[name].js',
  },
  watch: false,
  devtool: !isProd? "eval-source-map" : 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /(node_modules)/,
      }
    ]
  },
  optimization: {
    minimize: false,
    splitChunks: {
      chunks: "all",
      automaticNameDelimiter: '-',
    }
  },
}
// end configurations

// TASKS!!!----------------------------------------------------------
const clean = () => {
  return del("dist");
}

const fonts = () => {
  return src('src/static/fonts/**/*.*')
    .pipe(browserSync.stream())
    .pipe(dest('dist/static/fonts'));
}

const pugToHtml = () => {
  return src('src/pug/pages/*.pug')
    .pipe(gulpPlumber())
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(gulpPug())
    .pipe(gulpWebpHtml())
    .pipe(gulpPrettyHtml({
      indent_size: 2
    }))
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulpPlumber.stop())
    .pipe(browserSync.stream())
    .pipe(dest('dist'));
}

const scssToCss = () => {
  return src('src/static/styles/styles.scss')
    .pipe(gulpPlumber())
    .pipe(gulpIf(!isProd, sourcemaps.init()))
    .pipe(gulpSass.sync().on('error', gulpSass.logError))
    .pipe(postCss([
      autoprefixer({browserlist: ['last 2 versions', '> 2%'], cascade: true}),
      mqPacker({
        sort: true
      }),
      cssnano({ preset: 'default'})
    ]))
    .pipe(webpCss())
    .pipe(gulpIf(!isProd, sourcemaps.write()))
    .pipe(gulpPlumber.stop())
    .pipe(browserSync.stream())
    .pipe(dest('dist/static/css/'));
}

const scripts = () => {
  return src('src/static/js/main.js')
    .pipe(webpackStream(webpackConfig))
    .pipe(browserSync.stream())
    .pipe(dest('dist/static/js/'));
}

const images = () => {
  return src([
    'src/static/images/**/*.{png,jpeg,jpg,svg,webp,gif,ico}',
    '!src/static/images/sprite/*'
  ])
    .pipe(webp({quality: 85}))
    .pipe(dest('dist/static/images/'))
    .pipe(src([
      'src/static/images/**/*.{png,jpeg,jpg,svg,webp,gif,ico}',
      '!src/static/images/sprite/*'
    ]))
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 4}),
      imagemin.svgo({
        plugins: [
          {removeViewBox: true},
          {cleanupIDs: false}
        ]
      })
    ]))
    .pipe(browserSync.stream())
    .pipe(dest('dist/static/images/'));
}

const svgSpriteGenerate = () => {
  return src('src/static/images/sprite/*.svg')
    .pipe(svgmin({
      js2svg: {
        pretty: true
      }
    }))
    .pipe(cheerio({
      run: function ($) {
        $('[fill]').removeAttr('fill');
        $('[stroke]').removeAttr('stroke');
        $('[style]').removeAttr('style');
      },
      parserOptions: {xmlMode: true}
    }))
    .pipe(replace('&gt;', '>'))
    .pipe(svgSprite({
      mode: {
        symbol: {
          sprite: "sprite.svg"
        }
      }
    }))
    .pipe(dest('dist/static/images/sprite'));
}

const server = () => {
  browserSync.init({
    server: {
      baseDir: "./dist"
    },
    port: 4000,
    notify: false,
    open: false
  });
}

const watcher = () => {
  watch("src/pug/**/*.pug", pugToHtml);
  watch("src/static/styles/**/*.{scss, sass, css}", scssToCss);
  watch(["src/static/js/**/*.js"], scripts);
  watch(["src/static/images/**/*.{png,jpeg,jpg,svg,webp,gif,ico}", "!src/static/images/sprite/*"], images);
  watch("src/static/images/sprite/*.svg", svgSpriteGenerate);
  watch("src/static/fonts/**/*.*", fonts);
}

exports.default = series(clean, pugToHtml, scssToCss, images, fonts, svgSpriteGenerate, scripts, parallel(watcher, server));
exports.build = series(toProd, clean, pugToHtml, scssToCss, scripts, parallel(svgSpriteGenerate, fonts, images));