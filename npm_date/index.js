const d3time = require('d3-time');

var start = new Date(2020, 01, 15);
var end = new Date(2020, 03, 01);

var result = d3time.timeDay.count(start, end);
console.log(result)