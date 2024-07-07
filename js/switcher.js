class ThemeSwitcher {
    static preferedTheme = () => getStoredTheme() ? getStoredTheme() :
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    static getStoredTheme = () => localStorage.getItem('theme');

    static setStoredTheme = theme => localStorage.setItem('theme', theme);

    static setTheme = theme => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'))
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme)
        }
    };

    static getPreferredTheme = () =>
        ThemeSwitcher.getStoredTheme() ? ThemeSwitcher.getStoredTheme() :
            window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

    static showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector('#bd-theme');

        if (!themeSwitcher) {
            return
        }

        const themeSwitcherText = document.querySelector('#bd-theme-text');
        const activeThemeIcon = document.querySelector('i.theme-icon-active');

        const btnToActive = ThemeSwitcher.changeActiveBtn(theme);

        const iconOfActiveBtn = btnToActive.querySelector('i').classList.item(1);
        activeThemeIcon.classList.replace(activeThemeIcon.classList.item(1), iconOfActiveBtn);

        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
        themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);

        if (focus) {
            themeSwitcher.focus();
        }

        console.log(localStorage.getItem('theme'));
        document.querySelectorAll('[data-bs-theme]').forEach(
            theme => theme.setAttribute('data-bs-theme', localStorage.getItem('theme'))
        );
    }

    static changeActiveBtn(theme) {
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);

        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active')
            element.setAttribute('aria-pressed', 'false')
        });

        btnToActive.classList.add('active');
        btnToActive.setAttribute('aria-pressed', 'true');
        
        ThemeSwitcher.setCheckedButton();
        return btnToActive;
    }

    static setCheckedButton(){
        document.querySelectorAll('[data-bs-theme-value]>i.bi-check2').forEach(icon => {
            icon.classList.add('d-none');
            if(icon.parentNode.getAttribute('aria-pressed') === 'true'){
                icon.classList.remove('d-none');
            }
        });
    }

}
window.addEventListener('DOMContentLoaded', () => {
    ThemeSwitcher.showActiveTheme(ThemeSwitcher.getPreferredTheme());

    document.querySelectorAll('[data-bs-theme-value]').forEach(toggle => {
        toggle.addEventListener('click', () => {
            const theme = toggle.getAttribute('data-bs-theme-value');
            ThemeSwitcher.setStoredTheme(theme);
            ThemeSwitcher.setTheme(theme);
            ThemeSwitcher.showActiveTheme(theme, true);
        });
    });

});