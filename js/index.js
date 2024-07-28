import a from "./Task.js";
import CookieSettings from "./CookieStteings.js";

window.addEventListener('load', function(){
    let ñ = Object.create(a);
    ñ.kanban();
    
    CookieSettings.init();
});
