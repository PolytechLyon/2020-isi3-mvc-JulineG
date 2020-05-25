import "./style.css";
import { initView, drawGame } from "./gameOfLife/view";
import { Model } from "./gameOfLife/model";
import { controller } from "./gameOfLife/controller.js";

initView();

const model = new Model();
model.addObserver(drawGame);
model.init();

document.getElementById("start").onclick = function() {
    controller(model);
};
document.getElementById("stop").onclick = function() {
    model.stop();
};
document.getElementById("reset").onclick = function() {
    model.reset();
};
