const greeting = (name) => `hello${name}`;
const a = 100;
exports.a = a;
module.exports.greeting = greeting;
// 把这两个 a 和greeting导出后 从结果可以看出{ a: 100, greeting: [Function: greeting] }是等价的
// 但是实际结果以module.exports为准
module.exports = {
    name: '张三',
};
//重新赋值以后 以module.exports为准