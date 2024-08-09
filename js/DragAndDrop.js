export class DragAndDrop {

    constructor(containerAId, containerBId, draggableElement) {
        this.containerA = document.getElementById(containerAId);
        this.containerB = document.getElementById(containerBId);
        this.draggedItem = null;
        this.draggableElement = draggableElement;

        this.init();
    }

    init() {
        this.addDragAndDropEvents(this.containerA);
        this.addDragAndDropEvents(this.containerB);
    }

    addDragAndDropEvents(container) {
        const items = container.querySelectorAll(this.draggableElement);
        items.forEach(item => {
            item.setAttribute('draggable', 'true');
            item.addEventListener('dragstart', this.handleDragStart.bind(this));
            item.addEventListener('dragover', this.handleDragOver.bind(this));
            item.addEventListener('drop', this.handleDrop.bind(this));
            item.addEventListener('dragend', this.handleDragEnd.bind(this));

            // Eventos táctiles para dispositivos móviles
            item.addEventListener('touchstart', this.handleTouchStart.bind(this), { passive: true });
            item.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
            item.addEventListener('touchend', this.handleTouchEnd.bind(this));
        });

        container.addEventListener('dragover', this.handleDragOver.bind(this));
        container.addEventListener('drop', this.handleContainerDrop.bind(this));

        // Eventos táctiles para contenedores
        container.addEventListener('touchmove', this.handleTouchMove.bind(this), { passive: false });
        container.addEventListener('touchend', this.handleContainerTouchDrop.bind(this));
    }

    handleDragStart(e) {
        this.draggedItem = e.target;
        e.dataTransfer.effectAllowed = 'move';

        // Desaparecer el elemento en su contenedor de origen
        setTimeout(() => {
            e.target.style.opacity = '0';
        }, 0);

        // Mostrar el elemento más sólido mientras se arrastra
        e.target.classList.add('dragging');
        e.target.style.opacity = '1';
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleDrop(e) {
        e.preventDefault();
        if (this.draggedItem !== e.target) {
            const container = e.target.parentElement;
            container.insertBefore(this.draggedItem, e.target);
        }
    }

    handleContainerDrop(e) {
        e.preventDefault();
        const container = e.target;
        if (container === this.containerA || container === this.containerB) {
            container.appendChild(this.draggedItem);
        }
    }

    handleDragEnd(e) {
        e.target.style.opacity = '1';
        e.target.classList.remove('dragging');
        e.target.style.display = ''; // Restablecer la visibilidad del elemento
    }

    // Métodos para manejar eventos táctiles
    handleTouchStart(e) {
        this.draggedItem = e.target;
        console.log(e.target);

        // Emular el comportamiento de 'dragstart'
        e.target.classList.add('dragging');
        e.target.style.opacity = '1';

        this.initialX = e.touches[0].clientX;
        this.initialY = e.touches[0].clientY;

        setTimeout(() => {
            //e.target.style.display = 'none';
        }, 0);
    }

    handleTouchMove(e) {
        e.preventDefault(); // Prevenir el desplazamiento de la página

        const touch = e.touches[0];
        this.draggedItem.style.position = 'absolute';
        this.draggedItem.style.left = `${touch.clientX}px`;
        this.draggedItem.style.top = `${touch.clientY}px`;
    }

    handleTouchEnd(e) {
        e.preventDefault();
        this.draggedItem.style.position = ''; // Restablecer el estilo de posición
        this.draggedItem.classList.remove('dragging');
        this.draggedItem.style.display = ''; // Restablecer la visibilidad del elemento
    }

    handleContainerTouchDrop(e) {
        e.preventDefault();

        const containerRect = e.target.getBoundingClientRect();
        const touch = e.changedTouches[0];
        const container = (touch.clientX > containerRect.left && touch.clientX < containerRect.right &&
                           touch.clientY > containerRect.top && touch.clientY < containerRect.bottom) 
                           ? e.target : this.draggedItem.parentElement;

        if (container === this.containerA || container === this.containerB) {
            container.appendChild(this.draggedItem);
        }

        this.draggedItem.style.position = ''; // Restablecer el estilo de posición
        this.draggedItem.classList.remove('dragging');
        this.draggedItem.style.display = ''; // Restablecer la visibilidad del elemento
    }
}


class ContainerOrder {
    constructor(container) {
        this.container = container;
    }

    getOrder() {
        const items = Array.from(this.container.querySelectorAll('.draggable'));
        return items.map(item => item.textContent.trim());
    }

    printOrder() {
        const order = this.getOrder();
        console.log(`Order in ${this.container.id}:`, order);
    }
}