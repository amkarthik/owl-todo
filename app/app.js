const { Component, mount, xml, useRef, onMounted, useState} = owl;

class Task extends Component {
  static template = xml /*xml*/ `
  <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
  <input type="checkbox" t-att-checked="props.task.isCompleted" t-on-click="toggleTask" />
  <span><t t-esc="props.task.text" /></span>
  </div>
  `;
  static props = ["task"];

  toggleTask() {
    this.props.task.isCompleted = !this.props.task.isCompleted;
  }

}

class Root extends Component {
  static template = xml /*xml*/ `
  <h1 style="color: red">Todo App</h1>
  <div class="todo-app">
    <input placeholder="Enter a new task" t-on-keyup="addTask" t-ref="add-input"/>
    <div class="task-list">
      <t t-foreach="tasks" t-as="task" t-key="task.id">
        <Task task="task" />
      </t>
    </div>
  </div>
  `;

  static components = { Task };
    // 13 is keycode for Enter key
  addTask(ev) {
    if (ev.keyCode === 13) {
      const text = ev.target.value.trim();
      ev.target.value = "";
      if (text) {
        const newTask = {
          id: this.nextId++,
          text: text,
          isCompleted: false,
        };
        this.tasks.push(newTask);
      }
    }
  }

  setup() {
    const inputRef = useRef("add-input");
    onMounted(() => inputRef.el.focus());
  }

  nextId = 1;
  tasks = useState([]);
}

mount(Root, document.body, {dev: true});