import a from "./Task.js";
import CookieController from "./CookieSettings.js";
import { ActiveSwitch } from "./activeSwitch.js";

window.addEventListener('load', function(){
    try {
        let ñ = Object.create(a);
        ñ.init();
        let cookie = new CookieController();

        let as = Object.create(ActiveSwitch);
        as.init();
        
    } catch(error) {
        console.log(error);
    }
});
