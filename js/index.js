import a from "./Task.js";
import CookieController from "./CookieSettings.js";
import { ActiveSwitch } from "./activeSwitch.js";
import { DragAndDrop } from "./DragAndDrop.js";

window.addEventListener('load', function () {
    try {
        if(this.window.location.href.includes('atasks')){
            let ñ = Object.create(a);
            ñ.init();
            let cookie = new CookieController();
        }else if(this.window.location.href.includes('adragdrop')){
            let drag = new DragAndDrop('return-zone', 'dropzone', '.draggable');
            buttonget.addEventListener('click', function () {
                drag.getContainerOrder(drag.containerA, drag.containerB)
            });
        }
    } catch (error) {
        console.log(error);
    }
});
