const { Component, mount, xml } = owl;

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
  <div class="task-list">
    <t t-foreach="tasks" t-as="task" t-key="task.id">
      <Task task="task" />
    </t>
  </div>
  `;

  static components = { Task };


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