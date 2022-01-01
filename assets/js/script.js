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
  if (e.keyCode === 13) {
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
    <div class="task">
      <span class="taskName">
        ${input.value}
      </span>
      <button class="delete">
        <span class="iconify" data-icon="fluent:delete-24-filled"></span>
      </button>
    </div>
  `

  input.value = "";
}

window.addEventListener('DOMContentLoaded', () => {
  JSON.parse(localStorage.getItem('taskList')).forEach((el) => {
    taskList.innerHTML +=
      `
     <div class="task">
        <span class="taskName">
          ${el}
        </span>
        <button class="delete">
          <span class="iconify" data-icon="fluent:delete-24-filled"></span>
        </button>
    </div>
  `;
  });

  let tasksStatus = document.querySelectorAll('.task');
  for (let i = 0; i < tasksStatus.length; i++) {
    tasksStatus[i].onclick = function () {
      this.classList.toggle('completed');
    }
  }

  let currentTasks = document.querySelectorAll('.delete');

  for (let i = 0; i < currentTasks.length; i++) {
    currentTasks[i].onclick = function () {
      this.parentNode.remove();
      taskList.splice(index, 1);
      localStorage.setItem('taskList', JSON.stringify(array));
      toastr.info("Task removed successfully");
    }
  }
});