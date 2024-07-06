
let urls = ['candelariaData.json', 'izanaData.json'];

urls.forEach((url, index) => {
    fetch(url)
    .then(response => {
        if (!response.ok)
            throw new Error('Ha ocurrido un error: ' + response.statusText);
        return response.json();
    })
    .then(data => {
        console.log(data);

        //TODO
        (() => {
            'use strict';

            // Graphs
            const ctx = document.getElementById('myChart' + index);
            let fechas = data.map(item => item.fecha);
            let tempmax = data.map(item => item.tmax.replace(',', '.'));
            let tempmin = data.map(item => item.tmin.replace(',', '.'));

            let chartConfig1 = Object.create(ChartConfig);
            chartConfig1.init(fechas, tempmax);
            chartConfig1.data.datasets.push(
                {   
                    label: 'Temp. min.',
                    data: tempmin,
                    backgroundColor: 'transparent',
                    borderColor: '',
                    borderWidth: 2,
                    pointBackgroundColor: '#72b4f2',
                    pointRadius: 1
                }
            );

            const myChart = new Chart(ctx, {
                type: 'line',
                data: chartConfig1.getData(),
                options: chartConfig1.getOptions()
            });

            chartConfig1.data.datasets.pop();

        })();
    })
    .catch(error => console.log(error));
});

window.addEventListener('resize', () => sidebar.style.minHeight = document.body.scrollHeight + 'px');
