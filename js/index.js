let urls = ['candelaria', 'izana'];


window.addEventListener('resize', () => {
    if (document.body.scrollHeight <= window.innerHeight) {
        return sidebar.style.minHeight = window.innerHeight + 'px';
    } else {
        return sidebar.style.minHeight = document.body.scrollHeight + 'px';
    }
});

if (document.body.scrollHeight <= window.innerHeight) {
    sidebar.style.minHeight = window.innerHeight + 'px';
} else {
    sidebar.style.minHeight = document.body.scrollHeight + 'px';
}

document.addEventListener('DOMContentLoaded', function () {

    let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
        keyboard: false  // Evita que se cierre el modal pulsando la tecla "Esc"
    });
    cookiegood.addEventListener('click', () => {
        document.cookie = 'nombreDeCookie=valorDeCookie; path=/; SameSite=None; Secure';
        myModal.hide();
    })
    if(!document.cookie){
        myModal.show();
    }
   

    urls.forEach((url, index) => {
        fetch('app/' + url + 'Data.json')
            .then(response => {
                if (!response.ok)
                    throw new Error('Ha ocurrido un error: ' + response.statusText);
                return response.json();
            })
            .then(data => {
                console.log(data);
                let fecha = '2024-05-01';

                let nombre = data[0].nombre;
                let filteredData = data.filter(item => item.fecha >= fecha);

                let fechas = filteredData.map(item => item.fecha);
                let tmax = filteredData.map(item => item.tmax.replace(',', '.'));
                let tmin = filteredData.map(item => item.tmin.replace(',', '.'));

                (() => {
                    'use strict';
                    const ctx = document.getElementById('myChart' + index);

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
                            }
                        }
                    });

                })();
            })
            .catch(error => console.log(error));
    });
});
