export class SortableList {
    constructor(listId) {
        this.list = document.getElementById(listId);
        this.draggedItem = null;

        this.init();
    }

    init() {
        this.listItems = this.list.querySelectorAll('li');
        this.listItems.forEach(item => {
            item.addEventListener('dragstart', this.handleDragStart.bind(this));
            item.addEventListener('dragover', this.handleDragOver.bind(this));
            item.addEventListener('dragleave', this.handleDragLeave.bind(this));
            item.addEventListener('drop', this.handleDrop.bind(this));
            item.addEventListener('dragend', this.handleDragEnd.bind(this));
        });
    }

    handleDragStart(e) {
        this.draggedItem = e.target;
        e.target.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
    }

    handleDragOver(e) {
        e.preventDefault();
        e.target.classList.add('over');
    }

    handleDragLeave(e) {
        e.target.classList.remove('over');
    }

    handleDrop(e) {
        e.preventDefault();
        e.target.classList.remove('over');

        if (this.draggedItem !== e.target) {
            let items = Array.from(this.list.children);
            const draggedIndex = items.indexOf(this.draggedItem);
            const targetIndex = items.indexOf(e.target);

            if (draggedIndex < targetIndex) {
                this.list.insertBefore(this.draggedItem, e.target.nextSibling);
            } else {
                this.list.insertBefore(this.draggedItem, e.target);
            }
        }
    }

    handleDragEnd(e) {
        e.target.classList.remove('dragging');
        this.listItems.forEach(item => item.classList.remove('over'));
    }
}