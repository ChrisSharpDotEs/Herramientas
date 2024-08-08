import a from "./Task.js";
import CookieController from "./CookieSettings.js";
import { ActiveSwitch } from "./activeSwitch.js";
import { DragAndDrop } from "./DragAndDrop.js";

window.addEventListener('load', function(){
    try {
        let ñ = Object.create(a);
        ñ.init();
        let cookie = new CookieController();

        let as = Object.create(ActiveSwitch);
        as.init();

        let drag = new DragAndDrop('return-zone', 'dropzone', '.draggable');
        
    } catch(error) {
        console.log(error);
    }
});
