let urls = ['candelaria', 'izana', 'agulo', 'elpinar'];

function establecerLimites(fechas, lim) {
    fromDate.min = fechas[0];
    fromDate.max = fechas[fechas.length - lim];
    toDate.min = fechas[0];
    toDate.max = fechas[fechas.length - 1];
}

function setSideBarHeight() {
    const body = document.body;
    const html = document.documentElement;
    const documentHeight = Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
    sidebar.style.minHeight = documentHeight + 'px';
}

function meteo() {
    let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
        keyboard: false  // Evita que se cierre el modal pulsando la tecla "Esc"
    });

    cookiegood.addEventListener('click', () => {
        const date = new Date();
        date.setTime(date.getTime() + (1 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();

        document.cookie = 'nombreDeCookie=valorDeCookie;' + expires + 'path=/; SameSite=None; Secure';
        myModal.hide();
    });

    document.getElementsByClassName('navbar-toggler-icon')[0].addEventListener('click', function () {

    });

    if (!document.cookie) {
        myModal.show();
    }

    let fetchedData = {};

    urls.forEach(async (url, index) => {
        await fetch('app/' + url + '.json')
            .then(response => {
                if (!response.ok)
                    throw new Error('Ha ocurrido un error: ' + response.statusText);
                return response.json();
            })
            .then(data => {
                console.log(data);
                fetchedData = data;

                let nombre = data[0].nombre;

                let fechas = data.map(item => item.fecha);

                establecerLimites(fechas, 7);

                let tmax = data.map(item => item.tmax.replace(',', '.'));
                let tmin = data.map(item => item.tmin.replace(',', '.'));

                (() => {
                    'use strict';
                    const ctx = document.getElementById('myChart' + index);

                    ctx.setAttribute('data-name', nombre.toLowerCase());
                    let datasets = [
                        {
                            label: 'T. max',
                            data: tmax,
                            borderWidth: 1,
                            borderColor: 'red',
                            pointRadius: 1
                        },
                        {
                            label: 'T. min',
                            data: tmin,
                            borderWidth: 1,
                            borderColor: 'blue',
                            pointRadius: 1
                        }
                    ];

                    const myChart = new Chart(ctx, {
                        type: 'line',
                        data: {
                            labels: fechas,
                            datasets: datasets
                        },
                        options: {
                            plugins: {
                                labels: {
                                    display: true
                                },
                                title: {
                                    display: true,
                                    text: 'Temperaturas máximas y mínimas en'.concat(' ', nombre),
                                    font: {
                                        size: '20px'
                                    }
                                }
                            },
                            scales: {
                                x: {
                                    grid: {
                                        color: '#7d7d7d'
                                    }
                                },
                                y: {
                                    grid: {
                                        color: '#7d7d7d'
                                    }
                                }
                            }
                        }
                    });

                    dateFilter.addEventListener('click', (e) => {
                        const filteredData = data.filter(item => item.fecha >= fromDate.value && item.fecha <= toDate.value);

                        myChart.data.labels = filteredData.map(item => item.fecha);
                        myChart.data.datasets[0].data = filteredData.map(item => item.tmax.replace(',', '.'));
                        myChart.data.datasets[1].data = filteredData.map(item => item.tmin.replace(',', '.'));
                        myChart.update();
                    });

                    setSideBarHeight();
                })();
            })
            .catch(error => console.log(error));
    });
}

function kanban(){
    let tableColors = {
        'not started': 'table-danger',
        'started': 'table-warning',
        'finished': 'table-success'
    };

    let tbody = document.getElementsByTagName('tbody')[0];

    let rowData = [...document.getElementsByTagName('tr')].filter(item => item.hasAttribute('data-status'));
    rowData.forEach(item => {
        [...item.children].forEach(child => child.classList.add(tableColors[item.getAttribute('data-status')]));
        if(item.getAttribute('data-status') == 'finished'){
            [...item.children][item.children.length - 1].appendChild(buildTrashButton());
        }
    });
    
    let modalId = document.getElementById('kanmodal');

    document.querySelectorAll('i.bi-pencil-square').forEach(item => item.parentNode.addEventListener('click', (e) =>{
        

        let row = [...e.currentTarget.parentNode.parentNode.children]
            .map(item => item.children.length > 0 ? [...item.children] : item.innerHTML);

        let modalData = {
            nombre: row[0][1].innerHTML,
            imagen: row[0][0].src,
            codigo: row[1],
            concepto: row[2],
            created_at: row[3],
            status: row[4]
        };
        console.log(modalData);

        $('#kanmodal').modal('show');
        buildModal(modalData);
    }));

}

function buildTrashButton(){
    let button = document.createElement('button');
    button.classList.add('btn');
    [['data-toggle', "tooltip"], ['data-placement', 'bottom'], ['title', 'Eliminar tarea']].forEach(item => button.setAttribute(item[0], item[1]));
    let icon = document.createElement('i');
    icon.classList.add('bi', 'bi-trash');
    button.appendChild(icon);
    return button;
}

function buildModal(data){
    let modalbody = kanmodal.getElementsByClassName('modal-body')[0];
    modalTitleId.innerHTML = data.nombre;
    modalImage.src = data.imagen;
    modalStatus.innerHTML = `<b>Estado:</b> ${data.status}`;

}

document.addEventListener('DOMContentLoaded', function () {

    //meteo();
    kanban();


});
