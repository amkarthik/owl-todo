const {Component, mount, xml} = owl;

class Root extends Component {
  static template = xml /*xml*/ `
  <h1 style="color: red">Todo App</h1>
  <div class="task-list">
    <t t-foreach="tasks" t-as="task" t-key="task.id">
      <div class="task" t-att-class="task.isCompleted ? 'done' : ''">
        <input type="checkbox" t-att-checked="task.isCompleted" />
        <span><t t-esc="task.text" /></span>
      </div>
    </t>
  </div>
  `;

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

mount(Root, document.body);