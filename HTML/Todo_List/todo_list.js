document.addEventListener('DOMContentLoaded', function() {
    const todoForm = document.getElementById('todo-form');
    const todoInput = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');

    todoForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que se recargue la página al enviar el formulario

        const todoText = todoInput.value.trim(); // Obtener el valor del input y limpiar espacios

        if (todoText !== '') {
            // Verificar si la tarea ya está en la lista
            const tasks = Array.from(todoList.getElementsByTagName('li'));
            const taskExists = tasks.some(task => task.innerText === todoText);

            if (taskExists) {
                // Mostrar mensaje de confirmación
                const confirmMessage = `Ya existe una tarea "${todoText}" agregada. ¿Deseas agregarla de nuevo?`;
                if (!confirm(confirmMessage)) {
                    todoInput.value = ''; // Limpiar el input si el usuario cancela
                    return;
                }
            }

            const todoItem = document.createElement('li');
            todoItem.innerText = todoText;
            todoList.appendChild(todoItem);
            todoInput.value = ''; // Limpiar el input después de agregar la tarea

            // Agregar funcionalidad para marcar tarea como completada
            todoItem.addEventListener('click', function() {
                todoItem.classList.toggle('completed');
            });

            // Agregar botón para eliminar tarea
            const deleteButton = document.createElement('button');
            deleteButton.innerText = 'Eliminar';
            deleteButton.classList.add('delete-btn');
            todoItem.appendChild(deleteButton);

            // Mostrar botón de eliminar al pasar el mouse sobre la tarea
            todoItem.addEventListener('mouseenter', function() {
                deleteButton.style.display = 'inline-block';
            });

            // Ocultar botón de eliminar al quitar el mouse de la tarea
            todoItem.addEventListener('mouseleave', function() {
                deleteButton.style.display = 'none';
            });

            deleteButton.addEventListener('click', function() {
                // Añadir clase para animación de desvanecimiento
                todoItem.classList.add('fadeOut');

                // Eliminar el elemento después de que termine la animación
                setTimeout(function() {
                    todoItem.remove();
                }, 300);
            });
        }
    });
});
