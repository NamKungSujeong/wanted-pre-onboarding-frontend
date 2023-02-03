import { useState } from "react";

const TodoList = ({ todo }) => {
  const { id, isComplete, userId } = todo;
  const [todoItem, setTodoItem] = useState(todo);

  return (
    <li>
      <label>
        <input
          type="checkbox"
          id={`${id}`}
          className="check"
          name={`todo${id}`}
          value={`todo${id}`}
        />
        <span className="inputTodo">{todoItem.todo}</span>
      </label>
      <button data-testid="modify-button">수정</button>
      <button data-testid="delete-button">삭제</button>
    </li>
  );
};

export default TodoList;
