const CookieSettings = {
    init() {
        let cookieContent = document.querySelectorAll('.cookie-content');
        let existCookies = localStorage.getItem('accepted-cookies');

        if (existCookies == null) {
            var myModal = new bootstrap.Modal(document.getElementById('cookie-settings'));
            myModal.show();
            document.querySelectorAll('.cookie-nav').forEach((item, index, array) => {
                item.addEventListener('click', function () {

                    cookieContent.forEach(
                        item => { if (!item.classList.contains('d-none')) item.classList.add('d-none') }
                    );

                    array.forEach(item => {
                        if (item.classList.contains('active-border')) {
                            item.classList.remove('active-border');
                        }
                    });
                    cookieContent.item(index).classList.remove('d-none');
                    item.classList.add('active-border');
                });
            });
            this.confirm();
        }

    },

    confirm() {
        let choices = document.getElementById('cookie-consent-choices');
        let allCookies = document.getElementById('cookie-consent-all');

        choices.addEventListener('click', function () {
            let selectedCookies = [...document.getElementById('cookie-settings')
                .getElementsByTagName('input')]
                .filter(item => item.checked).map(item => item.getAttribute('id'));
            localStorage.setItem('accepted-cookies', JSON.stringify(selectedCookies));
        });
        allCookies.addEventListener('click', function () {
            let selectedCookies = [...document.getElementById('cookie-settings')
                .getElementsByTagName('input')].map(item => item.getAttribute('id'));
            localStorage.setItem('accepted-cookies', JSON.stringify(selectedCookies));
        });
    }
}

export default CookieSettings;