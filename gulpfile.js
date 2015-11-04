"use strict";

var gulp    = require( "gulp" );
var plugins = require( "gulp-load-plugins" )({ lazy: false });
var fs      = require( "fs" );
var argv    = require( "minimist" )(process.argv.slice(1));
var path    = require( "path" );

var compactCSS = ( argv.d || argv.debug ? 'expanded' : 'compressed');

gulp.task( 'styles', function() {
    gulp.src( 'src/sass/**/*.scss')
    .pipe( plugins.plumber({errorHandler: plugins.notify.onError("Erro ao compilar os styles, <%= error.message %>")}))
    
    .pipe( plugins.rubySass({
        loadPath        : ['bower_components'],
        noCache         : true,
        compass         : false,
        style           : compactCSS,
        trace           : true,
        'sourcemap=none': true
    }))
    .pipe( plugins.autoprefixer(['last 2 version', '> 1%', 'ie 8', 'ie 7'], {cascade: false}))
    .pipe( plugins.rename({
        suffix: '.min'
    }))
    .pipe( plugins.if( !( argv.d || argv.debug ), plugins.minifyCss() ) )
    .pipe( gulp.dest( 'dist/css' ))
    .pipe( plugins.if( argv.n || argv.notify, plugins.notify("CSS Compilado: <%= file.relative %>")) )
});

gulp.task( 'scripts', function() {
    gulp.src(['src/js/**/*.js', '!src/js/**/_*.js'])
    .pipe( plugins.plumber({errorHandler: plugins.notify.onError("Erro ao compilar os scripts, <%= error.message %>")}) )
    .pipe( plugins.dynamic({
        paths: ['bower_components']
    }))
    .pipe( plugins.if( !( argv.d || argv.debug ), plugins.uglify() ) )
    .pipe( plugins.rename({
        suffix: '.min'
    }))
    .pipe( gulp.dest( 'dist/js' ) )
    .pipe( plugins.if(argv.n || argv.notify, plugins.notify("JS Compilado: <%= file.relative %>")) )
});

gulp.task( 'watch', function() {
    gulp.watch([ 'src/sass/**/*.scss'], ['styles']);
    gulp.watch([ 'src/js/**/*.js'], ['scripts']);
});

gulp.task('build', ['styles', 'scripts']);
gulp.task('default', ['watch']);
