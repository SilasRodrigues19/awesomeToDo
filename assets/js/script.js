const input = document.querySelector('.newTask input'),
  taskList = document.querySelector('.tasks'),
  push = document.querySelector('.push'),
  deleteBtn = document.querySelector('delete');


toastr.options = {
  "closeButton": true,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-right",
  "preventDuplicates": true,
  "onclick": null,
  "showDuration": "10",
  "hideDuration": "5",
  "timeOut": "5000",
  "extendedTimeOut": "5000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

input.addEventListener("keydown", (e) => {
  if (e.key === 'Enter') {
    pushList();
  }
})

push.addEventListener('click', () => {
  pushList();
});


const pushList = () => {


  if (input.value.length == 0) {
    toastr.error("Please enter a task");
    return;
  }

  if (input.value.length < 10) {
    toastr.info("Your task is too short, please provide more details");
    return;
  }

  toastr.info("Task added successfully");

  const array = JSON.parse(localStorage.getItem('taskList')) || [];

  array.push(input.value);
  localStorage.setItem('taskList', JSON.stringify(array));

  taskList.innerHTML +=
    `
    <div class="task" id="task-${array.length}">
      <span class="taskName">
        ${input.value}
      </span>
      <button class="delete" onclick="deleteTask(${array.length})">
        <span class="iconify" data-icon="fluent:delete-24-filled"></span>
      </button>
    </div>
  `

  taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('task')) {
      event.target.classList.toggle('completed');
    }
  });

  input.value = "";
}

window.addEventListener('DOMContentLoaded', () => {
  JSON.parse(localStorage.getItem('taskList')).forEach((el, index) => {
    taskList.innerHTML +=
      `
     <div class="task" id="task-${index}">
        <span class="taskName">
          ${el}
        </span>
        <button class="delete" onclick="deleteTask(${index})">
          <span class="iconify" data-icon="fluent:delete-24-filled"></span>
        </button>
    </div>
  `;
  });
  taskList.addEventListener('click', (event) => {
    if (event.target.classList.contains('taskName')) {
      event.target.classList.toggle('completed');
    }
  });
});


const deleteTask = (index) => {
  let taskList = JSON.parse(localStorage.getItem('taskList'));
  taskList.splice(index, 1);
  localStorage.setItem('taskList', JSON.stringify(taskList));
  document.querySelector(`#task-${index}`).remove();

  toastr.error("Task deleted successfully");

}
