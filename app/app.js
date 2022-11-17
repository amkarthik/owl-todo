const { Component, mount, xml, useRef, onMounted, useState, reactive, useEnv} = owl;


function useStore() {
  const env = useEnv();
  return useState(env.store);
}

class TaskList {

  constructor(tasks) {
    this.tasks = tasks || [];
    const taskIds = this.tasks.map((t) => t.id);
    this.nextId = taskIds.length ? Math.max(...taskIds) + 1 : 1;
  }
  
  addTask(text) {
    text = text.trim();
    if (text) {
      const task = {
        id: this.nextId++,
        text: text,
        isCompleted: false,
      };
      this.tasks.push(task);
    }
  }

  toggleTask(task) {
    task.isCompleted = !task.isCompleted;
  }

  deleteTask(task) {
    const index = this.tasks.findIndex((t) => t.id === task.id);
    this.tasks.splice(index, 1);
  }
}

function createTaskStore() {
  // return reactive(new TaskList());
  const saveTasks = () => localStorage.setItem("todoapp", JSON.stringify(taskStore.tasks));
  const initialTasks = JSON.parse(localStorage.getItem("todoapp") || "[]");
  const taskStore = reactive(new TaskList(initialTasks), saveTasks);
  saveTasks();
  return taskStore;
}

class Task extends Component {
  static template = xml /*xml*/ `
  <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
  <input type="checkbox" t-att-checked="props.task.isCompleted" t-on-click="() => store.toggleTask(props.task)" />
  <span><t t-esc="props.task.text" /></span>
  <span class="delete" t-on-click="() => store.deleteTask(props.task)">🗑</span>
  </div>
  `;
  static props = ["task"];

  setup() {
    this.store = useStore();
  }
}

class Root extends Component {
  static template = xml /*xml*/ `
  <h1 style="color: red">Todo App</h1>
  <div class="todo-app">
    <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
    <div class="task-list">
      <t t-foreach="store.tasks" t-as="task" t-key="task.id">
        <Task task="task"/>
      </t>
    </div>
  </div>
  `;

  static components = { Task };
    // 13 is keycode for Enter key
  addTask(ev) {
    if (ev.keyCode === 13) {
      this.store.addTask(ev.target.value)
      ev.target.value = "";
    }
  }

  setup() {
    const inputRef = useRef("add-input");
    onMounted(() => inputRef.el.focus());
    this.store = useStore();
  }
}

const env = {
  store: createTaskStore(),
};

mount(Root, document.body, {dev: true, env});