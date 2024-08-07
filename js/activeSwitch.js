export const ActiveSwitch = {
    init(){
        let getfile = document.location.href.split('/').pop();
        console.log(getfile);
    },
    reset() {
        document.querySelectorAll('nav nav-link').forEach(
            item => item.classList.contains('active') ? item.classList.remove('active') : 0
        );
    }
};