'use strict';
exports.__esModule = true;
var axios_1 = require('axios');
var url = 'https://jsonplaceholder.typicode.com/todos/1';
axios_1['default'].get(url).then(function (res) {
    var todo = res.data;
    var id = todo.id,
        title = todo.title,
        completed = todo.completed;
    logTodo(id, title, completed);
});
var logTodo = function (id, title, completed) {
    console.log(id, title, completed);
};
var add = function (a, b) {
    return a + b;
};
var throwError = function (message) {
    // 'never' gets to the end (this is a corner case)
    throw new Error('error');
};
var someObject = {
    date: new Date(),
    weather: 'sunny',
};
var getObj = function (_a) {
    var date = _a.date,
        weather = _a.weather;
    console.log(date, weather);
};
getObj(someObject);
var profile = {
    name: 'ali',
    age: 20,
    coords: {
        lat: 0,
        lng: 15,
    },
    setAge: function (age) {
        this.age = age;
    },
};
var age = profile.age,
    name = profile.name;
var _a = profile.coords,
    lat = _a.lat,
    lng = _a.lng;
var arr = ['one', 'two', 'three'];
var arrByarr = [['firstArr'], ['secondArr'], ['thirdarr']];
arr.map(function (el) {
    return el.toUpperCase();
});
var newArr = [new Date(), '31234'];
var pepsi = ['something', 40, true];
var Car = /** @class */ (function () {
    function Car(color) {
        this.color = color;
    }
    Car.prototype.getColor = function () {
        return this.color;
    };
    return Car;
})();
var car = new Car('blue');
var color = car.getColor();
console.log(color);
