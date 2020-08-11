//引用gulp模块
const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const fileinclude = require('gulp-file-include');
const less = require('gulp-less');
const csso = require('gulp-csso');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
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
//1、less语法转换gulp-less
//2、css代码压缩gulp-csso
gulp.task('less', function() {
    return gulp.src(['./src/css/*.less', './src/css/*.css'])
        .pipe(less())
        .pipe(csso())
        .pipe(gulp.dest('dist/css'));
});

//js任务
//es6转换gulp-babel 
//js代码压缩gulp-uglify

gulp.task('jsmin', () =>
    gulp.src('./src/js/*.js')
    .pipe(babel({
        //判断代码的运行环境 将代码转换为运行环境支持的代码
        presets: ['@babel/env']
    }))
    //压缩
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
);