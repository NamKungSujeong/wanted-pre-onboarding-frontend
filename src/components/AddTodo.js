import { useState } from "react";

const AddTodo = ({ addTodo }) => {
  const [todoItem, setTodoItem] = useState({
    todo: "",
  });

  const addBtn = () => {
    if (todoItem.todo.trim().length === 0) {
      return;
    }
    addTodo(todoItem);
    setTodoItem({ todo: "" });
  };
  const LogOut = () => {
    localStorage.getItem("access_token");
    localStorage.clear();
    window.location.replace("/");
  };
  return (
    <div>
      <input
        data-testid="new-todo-input"
        type="text"
        placeholder="Add your new Todo"
        value={todoItem.todo}
        onChange={(e) => setTodoItem({ todo: e.target.value })}
        autoFocus
      />
      <button data-testid="new-todo-add-button" onClick={addBtn}>
        추가
      </button>

      <button onClick={LogOut}>로그아웃</button>
    </div>
  );
};

export default AddTodo;
