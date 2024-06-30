class SnippetConverter {
    #snippetname;
    #prefix;
    #scope;
    #body;
    #description;
    static SCOPES = ['html', 'javascript, typescript', 'php'];

    constructor(snippetname, prefix, scope, body, description) {
        this.#snippetname = snippetname;
        this.#prefix = prefix;
        this.#scope = SnippetConverter.SCOPES[scope];
        this.#body = this.#formatBody(body);
        this.#description = description;
    }

    getPrefix(){
        return this.#prefix;
    }

    #formatBody(value) {
        let text = value.replace(/\s*<!--[\s\S]*?-->/g, '')
            .replace(/"/g, '\\"')
            .split('\n')
            .map(item => {
                return `"${item}",`
            })
            .join('\n');
        return text.substring(0, text.lastIndexOf(','));
    }

    parseSnippet() {
        return `"${this.#snippetname}": {\n\t"scope": "${this.#scope}",\n\t"prefix": "${this.#prefix}",`
            + `\n\t"body": [${this.#body}],\n\t"description": "${this.#description}"\n}`;
    }
}

document.create = function (element, classes, textcontent, styles) {
    let el = document.createElement(element);
    el.classList.add(...classes);
    Object.keys(styles).forEach((style, index) => el.style[style] = Object.values(styles)[index]);
    el.append(textcontent);
    return el;
}

function html(data, snippetTitle) {
    let border = document.create(
        'li', ['list-group-item', 'border', 'my-2'], '', { borderRadius: '0px', padding: '0px' }
    );
    border.setAttribute('data-snippet-json', data);

    let flex = document.create('div', ['d-flex'], '', {});

    let title = document.create('div', ['p-3', 'mx-2', 'w-75'], snippetTitle, {});

    let button = document.create('button', ['btn', 'btn-danger', 'w-25'], 'X', { borderRadius: '0px' })
    button.addEventListener('click', function (e) {
        e.currentTarget.parentNode.parentNode.remove();
    });

    flex.append(title);
    flex.append(button);

    border.append(flex);

    return border;
}

function copyData(dataInfo) {
    navigator.clipboard.writeText(dataInfo).then(() => {
    }).catch(err => {
        console.error('Error al copiar al portapapeles: ', err);
    });
}

window.addEventListener('load', function () {
    document.querySelectorAll('input').forEach(item => {
        item.addEventListener('keyup', function () {
            item.classList.remove('is-invalid');
            if (item.children[2]) item.children[2].remove();
        });
    });

    document.forms[0].addEventListener('submit', function (e) {
        let filled = true;
        e.preventDefault();

        if (!e.currentTarget.checkValidity()) {
            e.preventDefault();
            filled = false;
            item.classList.add('is-invalid');
            item.parentNode.insertAdjacentHTML('beforeend', '<small class="text-danger">Debe rellenar este campo.</small>')
        }

        if (filled) {
            let snp = new SnippetConverter(
                snippetname.value,
                prefix.value,
                scope.value,
                body.value,
                description.value
            );
            let snippetContent = snp.parseSnippet();
            
            output.append(html(snippetContent, snp.getPrefix()));
            document.forms[0].body.innerHTML = '';
        }
    });

    copysnippets.addEventListener('click', function (e) {
        let result = '';
        document.querySelectorAll('[data-snippet-json]').forEach(item => {
            result += item.getAttribute('data-snippet-json') + ',';
        })
        copyData(result);
    });
});