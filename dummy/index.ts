import axios from 'axios';

const url = 'https://jsonplaceholder.typicode.com/todos/1';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

axios.get(url).then((res) => {
    const todo = res.data as Todo;
    const { id, title, completed } = todo;
    logTodo(id, title, completed);
});

const logTodo = (id: number, title: string, completed: boolean): void => {
    console.log(id, title, completed);
};

const add = (a: number, b: number): number => {
    return a + b;
};

const throwError = (message: string): never => {
    // 'never' gets to the end (this is a corner case)
    throw new Error('error');
};

const someObject = {
    date: new Date(),
    weather: 'sunny',
};

const getObj = ({ date, weather }: { date: Date; weather: string }): void => {
    console.log(date, weather);
};

getObj(someObject);

const profile = {
    name: 'ali',
    age: 20,
    coords: {
        lat: 0,
        lng: 15,
    },
    setAge(age: number): void {
        this.age = age;
    },
};

const { age, name }: { age: number; name: string } = profile;
const {
    coords: { lat, lng },
}: { coords: { lat: number; lng: number } } = profile;

const arr: string[] = ['one', 'two', 'three'];
const arrByarr: string[][] = [['firstArr'], ['secondArr'], ['thirdarr']];

arr.map((el: string): string => {
    return el.toUpperCase();
});

const newArr: (Date | string)[] = [new Date(), '31234'];

//Type Alias
type Drink = [string, number, boolean];

const pepsi: Drink = ['something', 40, true];

class Car {
    constructor(public color: string) {}
    getColor(): string {
        return this.color;
    }
}

const car = new Car('blue');
const color = car.getColor();
console.log(color);

interface Apple<Type> {
    add: (obj: Type) => void;
    get: () => Type;
}

declare const apple: Apple<string>;
apple.add('hi');
const h = apple.get();

class User {
    info: {
        name: string;
        id: number;
    };
    constructor(name: string, id: number) {
        this.info = {
            name,
            id,
        };
    }
}

class Admin {
    info: {
        name: string;
        id: number;
        ok: boolean
    };
    constructor(name: string, id: number) {
        this.info = {
            name,
            id,
            ok: true
        };
    }
}

const user = new User('ahmad', 23);
const admin = new Admin('guz', 23);

interface reportable {
    info: {
        name: string;
        id: number;
    };
}

function report(info: reportable): void {
    console.log(info);
}
 report(admin)