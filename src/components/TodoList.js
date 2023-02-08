import { useState } from "react";

const TodoList = ({ todo, deleteTodo, updateTodo }) => {
  const { isCompleted } = todo;
  const [todoItem, setTodoItem] = useState(todo);
  const [modify, setModify] = useState(false);

  // console.log(todos);
  // console.log(todoItem);

  const editEventHandler = (e) => {
    const { todo, ...rest } = todoItem;

    setTodoItem({
      todo: e.target.value,
      ...rest,
    });
  };

  const modifyBtn = () => {
    setModify(true);
  };

  const deleteBtn = () => {
    deleteTodo(todoItem);
  };

  const submitBtn = () => {
    updateTodo(todoItem);
    setModify(false);
  };

  const cancelBtn = () => {
    setModify(false);
    setTodoItem(todo);
  };

  const checkboxhandler = (e) => {
    const { isCompleted, ...rest } = todoItem;

    const updateItem = {
      isCompleted: e.target.checked,
      ...rest,
    };
    setTodoItem(updateItem);
    updateTodo(updateItem);
  };

  return (
    <li>
      <label>
        <input
          type="checkbox"
          className="check"
          defaultChecked={isCompleted}
          onChange={checkboxhandler}
        />
        {modify ? (
          <>
            <input
              data-testid="modify-input"
              type="text"
              value={todoItem.todo}
              onChange={editEventHandler}
            ></input>
            <button data-testid="submit-button" onClick={submitBtn}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={cancelBtn}>
              취소
            </button>
          </>
        ) : (
          <>
            <span className="inputTodo">{todoItem.todo}</span>
            <button data-testid="modify-button" onClick={modifyBtn}>
              수정
            </button>
            <button data-testid="delete-button" onClick={deleteBtn}>
              삭제
            </button>
          </>
        )}
      </label>
    </li>
  );
};

export default TodoList;
