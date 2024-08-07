const TaskManager = {
    tableColors: {
        'not started': 'table-danger',
        'started': 'table-warning',
        'finished': 'table-success'
    },

    init() {
        try {
            this.loadTaskData();
            this.modifyTask();
            this.addTask();

        } catch (error) {
            console.log(error);
        }

    },

    loadTaskData() {
        let tbody = document.getElementById('tbodytasks');
        let tasks = JSON.parse(localStorage.getItem('tasks'));
        let table = document.getElementById('sortable-table');
        let messages = document.getElementById('messages');

        if(tasks == null || tasks.length == 0){
            table.classList.add('d-none');
            messages.classList.toggle('d-none');
            messages.innerHTML = 'No hay tareas.';
        } else {
            messages.classList.toggle('d-none');
            table.classList.remove('d-none');
            tasks.forEach(task => tbody.appendChild(this.buildTaskRow(task)));
        }
    },

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

            $('#kanmodal').modal('show');
            this.buildModal(modalData);
        }));
    },

    buildTrashButton(rowData) {
        let that = this;
        let button = document.createElement('button');
        let icon = document.createElement('i');
        button.classList.add('btn');
        [['data-toggle', "tooltip"], ['data-placement', 'bottom'], ['title', 'Eliminar tarea']]
        .forEach(item => button.setAttribute(item[0], item[1]));
        
        icon.classList.add('bi', 'bi-trash');
        button.appendChild(icon);

        button.addEventListener('click', function(){
            let rows = [...document.querySelectorAll('tbody tr')];
            let index = rows.indexOf(rows.find(item => item.getAttribute('data-id') == rowData.code));

            let taskList = JSON.parse(localStorage.getItem('tasks'));
            
            taskList.splice(index, 1);
            
            localStorage.setItem('tasks', JSON.stringify(taskList));

            rows[index].remove();

            if(taskList.length == 0){
                that.loadTaskData();
            }
        });

        return button;
    },

    buildEditbutton(rowData){
        let button = document.createElement('button');
        let icon = document.createElement('i');

        button.classList.add('btn');
        button.setAttribute('data-bs-toggle', 'modal');
        button.setAttribute('data-bs-target', '#kanmodal');
        icon.classList.add('bi', 'bi-pencil-square');

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
        let td = document.createElement('td');

        tr.setAttribute('data-status', rowData.status);
        tr.setAttribute('data-id', rowData.code);

        Object.keys(rowData).forEach((item, index) => {
            let td = document.createElement('td');

            if (item == 'nombre') {
                let img = document.createElement('img');
                let nombre = document.createElement('span');
                nombre.appendChild(document.createTextNode(rowData[item]));
                nombre.classList.add('px-2');

                img.src = 'media/dummyuser.png';
                img.alt = 'Imagen de usuario';
                img.classList.add('img-fluid', 'rounded-circle');
                img.width = '30';
                td.appendChild(img);
                td.appendChild(nombre);
            } else {
                td.appendChild(document.createTextNode(rowData[item]));
            }
            tr.appendChild(td);
        });
        
        td.appendChild(this.buildEditbutton(rowData))
        td.appendChild(this.buildTrashButton(rowData));
        tr.appendChild(td);

        [...tr.children].forEach(item => item.classList.add(this.tableColors[tr.getAttribute('data-status')]));

        return tr;
    },

    addTask() {
        let saveTaskButton = document.getElementById('save-new-task');
        let rowData = [...document.getElementsByTagName('tr')].filter(item => item.hasAttribute('data-status'));

        let tbody = document.getElementById('tbodytasks');

        saveTaskButton.addEventListener('click', () => {
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

            this.loadTaskData();
        });
    },

    removeTask(){
        //TODO
    }
};

const TaskBuilder = {

};

const a = Object.create(TaskManager);
export default a;
