import { EventEmitter } from "events"; // Импортируем EventEmitter
const myEmitter = new EventEmitter(); // Создаем новый экземпляр EventEmitter

function oneFnOne(data: string) {
  console.log(`Hello number${data}`);
}
function oneFnTwo(dataS: string) {
  console.log(`Hello number${dataS}`);
}
function oneFnTree(dataW: string) {
  console.log(`Hello number${dataW}`);
}

myEmitter.on("data", oneFnOne);
myEmitter.on("dataS", oneFnTwo);
myEmitter.on("dataWw", oneFnTree);

myEmitter.emit("data", 1);
myEmitter.emit("data", 2);
myEmitter.emit("data", 33);
