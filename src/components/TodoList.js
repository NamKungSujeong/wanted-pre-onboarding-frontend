import { useState } from "react";

const TodoList = ({ todo, deleteTodo, updateTodo }) => {
  const { id, isComplete, userId } = todo;
  const [todoItem, setTodoItem] = useState(todo);
  const [modify, setModify] = useState(false);

  const editEventHandler = (e) => {
    // rest: id, done 정보
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

  // const submitBtn = () => {
  //   updateTodo(todoItem);
  //   setModify(false);
  // };

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
        {modify ? (
          <>
            <input
              data-testid="modify-input"
              type="text"
              value={todoItem.todo}
              onChange={editEventHandler}
            ></input>
            <button data-testid="submit-button">제출</button>
            <button data-testid="cancel-button">취소</button>
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
