//引用gulp模块
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
var less = require('gulp-less');
var path = require('path');
var csso = require('gulp-csso');


//建立任务

gulp.task('first', () => {
    console.log('第一个gulp');
    return gulp.src('./src/css/base.css')
        //拷贝操作
        .pipe(gulp.dest('dist/css'));
});

//html任务(npm install gulp-htmlmin)
//1、代码压缩
//2、抽取html文件中的公共代码
gulp.task('htmlmin', () => {
    return gulp.src('./src/*.html')
        .pipe(fileinclude())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'));
});

//css任务
//1、less语法转换
//2、css代码压缩
gulp.task('less', function() {
    return gulp.src(['./src/css/*.less', './src/css/*.css'])
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));
});