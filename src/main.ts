import "./style.scss";
interface Todo {
  title: string;
  isCompleted: boolean;
  readonly id: string;
}
const todos: Array<Todo> = [];

const todocontainer = document.querySelector(
  ".todocontainer"
) as HTMLDivElement;

const todoinput = document.getElementsByName("title")[0] as HTMLInputElement;

const myform = document.getElementById("myform") as HTMLFormElement;

myform.onsubmit = (e: SubmitEvent) => {
  e.preventDefault();
  const todo: Todo = {
    title: todoinput.value,
    isCompleted: false,
    id: String(Math.random() * 100),
  };
  todos.push(todo);
  todoinput.value = "";
  renderTodo(todos);
};
const generatetodoIteam = (title: string, isCompleted: boolean, id: string) => {
  const todo: HTMLDivElement = document.createElement("div");
  todo.className = "todo";
  //Checkbox
  const checkBox: HTMLInputElement = document.createElement("input");
  checkBox.setAttribute("type", "checkbox");
  checkBox.className = "iscompleted";
  checkBox.checked = isCompleted;
  checkBox.onchange = () => {
    todos.find((item) => {
      if (item.id === id) item.isCompleted = checkBox.checked;
    });
    paragraph.className = checkBox.checked ? "text-cut" : "";
  };
  //creating p for title

  const paragraph: HTMLParagraphElement = document.createElement("p");
  paragraph.innerText = title;
  paragraph.className = isCompleted ? "text-cut" : "";
  //button
  const button: HTMLButtonElement = document.createElement("button");
  button.innerText = "X";
  button.className = "delete";
  button.onclick = () => {
    deletelist(id);
  };
  // Append todo
  todo.append(checkBox, paragraph, button);
  todocontainer.append(todo);
};
const deletelist = (id: string) => {
  const idx = todos.findIndex((Item) => Item.id === id);
  todos.splice(idx, 1);
  // console.log(todos);
  renderTodo(todos);
};

const renderTodo = (todos: Todo[]) => {
  todocontainer.innerText = "";
  todos.forEach((item) => {
    generatetodoIteam(item.title, item.isCompleted, item.id);
  });
};
