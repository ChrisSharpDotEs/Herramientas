const TaskManager = {
    kanban() {
        this.loadTaskData();
        this.modifyTask();

        this.addTask();
    },

    loadTaskData(){
        let tbody = document.getElementById('tbodytasks');
        let tasks = localStorage.getItem('task');
        tasks.forEach(task => tbody.appendChild(this.buildTaskRow(task)));
    }

    modifyTask() {
        document.querySelectorAll('i.bi-pencil-square').forEach(item => item.parentNode.addEventListener('click', (e) => {
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
            this.buildModal(modalData);
        }));
    },

    buildTrashButton() {
        let button = document.createElement('button');
        button.classList.add('btn');
        [['data-toggle', "tooltip"], ['data-placement', 'bottom'], ['title', 'Eliminar tarea']].forEach(item => button.setAttribute(item[0], item[1]));
        let icon = document.createElement('i');
        icon.classList.add('bi', 'bi-trash');
        button.appendChild(icon);
        return button;
    },

    buildModal(data) {
        let modalbody = kanmodal.getElementsByClassName('modal-body')[0];
        modalTitleId.innerHTML = data.nombre;
        modalImage.src = data.imagen;
        modalStatus.innerHTML = `<b>Estado:</b> ${data.status}`;
    },

    buildTaskRow(rowData) {
        let tr = document.createElement('tr');
        tr.setAttribute('data-status', rowData.status)
        let tableColors = {
            'not started': 'table-danger',
            'started': 'table-warning',
            'finished': 'table-success'
        };

        Object.keys(rowData).forEach((item, index) => {
            let td = document.createElement('td');

            if (item == 'nombre') {
                let img = document.createElement('img');
                let nombre = document.createElement('span');
                nombre.appendChild(document.createTextNode(rowData[item]))
                img.src = 'media/dummyuser.png';
                img.alt = 'Imagen de usuario';
                img.classList.add('img-fluid', 'rounded-circle');
                img.width = '30';
                td.appendChild(img);
                td.appendChild(nombre);
            } else if (item == 'nombre') {
                ;
            } else {
                td.appendChild(document.createTextNode(rowData[item]));
            }
            tr.appendChild(td);
        });
        let td = document.createElement('td');
        td.innerHTML = '<button class="btn" data-bs-toggle="modal" data-bs-target="#kanmodal">'
            + '<i class="bi bi-pencil-square"></i>'
            + '</button>';
        td.appendChild(this.buildTrashButton());
        tr.appendChild(td);
        
        [...tr.children].forEach(item => item.classList.add(tableColors[tr.getAttribute('data-status')]));

        return tr;
    },

    addTask() {
        let button = document.getElementById('save-new-task');
        let form = document.getElementById('new-task-form');
        let rowData = [...document.getElementsByTagName('tr')].filter(item => item.hasAttribute('data-status'));
        
        let tbody = document.getElementById('tbodytasks');

        button.addEventListener('click', () => {
            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            let fecha = new Date();
            let fechaFormada = fecha.getDate() + '/' + fecha.getMonth() + 1 + '/' + fecha.getFullYear();

            let data = {
                nombre: encargado.value,
                code: parseInt(Math.random() * 10000) + ['A', 'B', 'C'][parseInt(Math.random() * 3)],
                concepto: descriptionTask.value,
                created_at: fechaFormada,
                status: statustask.value,
                priority: priorityTask.value
                //finish_time: fecha_fin.value,
            };

            tasks.push(data);

            localStorage.setItem('tasks', JSON.stringify(tasks));
            
            tbody.innerHTML = '';

            tasks.forEach(task => tbody.appendChild(this.buildTaskRow(task)));
            
            
        });
    }
};
const a = Object.create(TaskManager);
export default a;
