/* globals Chart:false */
const ChartConfig = {
    data: {
        labels: [],
        datasets: [{
            data: [],
            backgroundColor: 'transparent',
            borderColor: '',
            borderWidth: 2,
            pointBackgroundColor: '#007bff',
            pointRadius: 1
        }]
    },
    options: {
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                boxPadding: 3
            }
        },
        scales: {
            x: {
                display: true,
                borderDash: [20, 20]
            },
            y: {
                grid: {
                    display: true,
                    color: '#616161',
                    borderWidth: 0
                }
            }
        }
    },

    init: function (labels, ydata, bordercolor = '#c172f2', options = this.options) {
        this.data.labels = labels;
        this.data.datasets[0].data = ydata;
        this.data.datasets[0].borderColor = bordercolor;
        this.options = options;
    },

    getData: function(){
        return this.data;
    },

    getOptions: function(){
        return this.options;
    }
};