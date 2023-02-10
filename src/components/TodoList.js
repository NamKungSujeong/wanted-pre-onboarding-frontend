import { useState } from "react";
import styled from "styled-components";

const TodoList = ({ todo, deleteTodo, updateTodo }) => {
  const { isCompleted } = todo;
  const [todoItem, setTodoItem] = useState(todo);
  const [modify, setModify] = useState(false);

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
    if (todoItem.todo.trim().length === 0) {
      return;
    }
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
    <Todo>
      <label>
        <input
          type="checkbox"
          className="check"
          defaultChecked={isCompleted}
          onChange={checkboxhandler}
        />
        {modify ? (
          <>
            <ModifyInput
              data-testid="modify-input"
              type="text"
              value={todoItem.todo}
              onChange={editEventHandler}
            ></ModifyInput>

            <button data-testid="submit-button" onClick={submitBtn}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={cancelBtn}>
              취소
            </button>
          </>
        ) : (
          <>
            <TodoSpan className="inputTodo">{todoItem.todo}</TodoSpan>

            <button data-testid="modify-button" onClick={modifyBtn}>
              수정
            </button>
            <button data-testid="delete-button" onClick={deleteBtn}>
              삭제
            </button>
          </>
        )}
      </label>
    </Todo>
  );
};

export default TodoList;

const Todo = styled.li`
  padding: 5px 0;

  button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #fff;
    border: 1px solid black;
    border-radius: 5px;
    font-weight: 600;

    &:hover {
      cursor: pointer;
      background-color: #e9e9e9;
    }
  }
`;

const TodoSpan = styled.span`
  margin-left: 5px;
  display: inline-block;
  width: 250px;
`;

const ModifyInput = styled.input`
  width: 250px;
`;
