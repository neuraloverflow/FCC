"use strict";var gulp=require("gulp"),autoprefixer=require("gulp-autoprefixer"),browserSync=require("browser-sync").create(),useref=require("gulp-useref"),uglify=require("gulp-uglify"),pump=require("pump"),babel=require("gulp-babel"),cleanCSS=require("gulp-clean-css"),rename=require("gulp-rename"),del=require("del");gulp.task("clean",function(){return del(["build/"])}),gulp.task("styles",function(){gulp.src("styles.css").pipe(autoprefixer()).pipe(gulp.dest("build")).pipe(browserSync.reload({stream:!0}))}),gulp.task("browserSync",function(){browserSync.init({server:{baseDir:"./"}})}),gulp.task("js",function(e){pump([gulp.src("*.js"),babel({presets:["es2015"]}),uglify(),gulp.dest("build")],e)}),gulp.task("useref",function(){return gulp.src("*.html").pipe(useref()).pipe(gulp.dest("build"))}),gulp.task("mincss",function(){return gulp.src("*.css").pipe(cleanCSS()).pipe(rename({basename:"styles",suffix:".min"})).pipe(gulp.dest("build"))}),gulp.task("watch",["browserSync","mincss","js","useref"],function(){gulp.watch("styles.css",["styles","mincss"]),gulp.watch("*.html",browserSync.reload),gulp.watch("*.css",browserSync.reload),gulp.watch("*.js",["js","useref"]),gulp.watch("*.js",browserSync.reload)});