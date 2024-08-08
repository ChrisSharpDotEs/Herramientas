export class DragAndDrop {
    containerA;
    containerB;

    constructor(containerAId, containerBId, draggableElement) {
        this.containerA = document.getElementById(containerAId);
        this.containerB = document.getElementById(containerBId);
        this.draggableElement = draggableElement;
        this.draggedItem = null;

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
        });

        container.addEventListener('dragover', this.handleDragOver.bind(this));
        container.addEventListener('drop', this.handleContainerDrop.bind(this));
    }

    handleDragStart(e) {
        this.draggedItem = e.target;
        e.dataTransfer.effectAllowed = 'move';
        setTimeout(() => {
            e.target.classList.add('hide');
        }, 0);

        e.target.classList.add('dragging');
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
        e.target.classList.remove('dragging');
        e.target.classList.remove('hide');
    }

    getContainerOrder(containerA, containerB){
        const containerAOrder = new ContainerOrder(containerA);
        const containerBOrder = new ContainerOrder(containerB);

        containerAOrder.printOrder();
        containerBOrder.printOrder();
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