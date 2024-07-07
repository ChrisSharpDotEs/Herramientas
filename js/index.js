
let urls = ['candelaria', 'izana'];

urls.forEach((url, index) => {
    fetch('app/' + url + 'Data.json')
        .then(response => {
            if (!response.ok)
                throw new Error('Ha ocurrido un error: ' + response.statusText);
            return response.json();
        })
        .then(data => {
            console.log(data);
            let fechas = data.map(item => item.fecha);
            let tmax = data.map(item => item.tmax.replace(',', '.'));
            let tmin = data.map(item => item.tmin.replace(',', '.'));

            (() => {
                'use strict';
            
                // Graphs
                const ctx = document.getElementById('myChart' + index);
            
                let datasets = [
                    {
                        label: 'T. max',
                        data: tmax,
                        borderWidth: 1,
                        borderColor:  'red',
                        pointRadius: 1
                    },
                    {
                        label: 'T. min',
                        data: tmin,
                        borderWidth: 1,
                        borderColor:  'blue',
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
                        
                    },
                    plugins:{
                        labels: {
                            display: true
                        }
                    }
                });
            
            })();
        })
        .catch(error => console.log(error));
});

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
