const { Component, mount, xml, useRef, onMounted} = owl;

class Task extends Component {
  static template = xml /*xml*/ `
  <div class="task" t-att-class="props.task.isCompleted ? 'done' : ''">
  <input type="checkbox" t-att-checked="props.task.isCompleted" />
  <span><t t-esc="props.task.text" /></span>
  </div>
  `;
  static props = ["task"];

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
      console.log("adding Task", text);
    }
  }

  setup() {
    const inputRef = useRef("add-input");
    onMounted(() => inputRef.el.focus());
  }

  tasks = [
    {
      id: 1,
      text: "code todo app in owl",
      isCompleted: true,
    },
    {
      id: 2,
      text: "proceed further in learning owl",
      isCompleted: false,
    },
  ];
}

mount(Root, document.body, {dev: true});