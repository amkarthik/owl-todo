const {Component, mount, xml} = owl;

class Root extends Component {
  static template = xml /*xml*/ `<h1 style="color: red">Todo App</h1>`;
}

mount(Root, document.body);