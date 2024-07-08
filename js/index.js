let urls = ['candelaria', 'izana'];

function establecerLimites(fechas, lim){
    fromDate.min = fechas[0];
    fromDate.max = fechas[fechas.length - lim];
    toDate.min = fechas[0];
    toDate.max = fechas[fechas.length - 1];
}

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

document.addEventListener('DOMContentLoaded', async function () {

    let myModal = new bootstrap.Modal(document.getElementById('staticBackdrop'), {
        keyboard: false  // Evita que se cierre el modal pulsando la tecla "Esc"
    });
    cookiegood.addEventListener('click', () => {
        const date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        
        document.cookie = 'nombreDeCookie=valorDeCookie;' + expires + 'path=/; SameSite=None; Secure';
        myModal.hide();
    })
    if(!document.cookie){
        myModal.show();
    }
   
    let fetchedData = {};
    
    await urls.forEach((url, index) => {
        fetch('app/' + url + 'Data.json')
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

                    dateFilter.addEventListener('click', (e) => {
                        
                        const filteredData = data.filter(item => item.fecha >= fromDate.value && item.fecha <= toDate.value);

                        myChart.data.labels = filteredData.map(item => item.fecha);
                        myChart.data.datasets[0].data = filteredData.map(item => item.tmax.replace(',', '.'));
                        myChart.data.datasets[1].data = filteredData.map(item => item.tmin.replace(',', '.'));
                        myChart.update();
                    });
                })();
            })
            .catch(error => console.log(error));
    });
    

});
