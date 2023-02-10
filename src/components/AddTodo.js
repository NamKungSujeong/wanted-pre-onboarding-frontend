import { useState } from "react";
import styled from "styled-components";

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

  return (
    <TodoAddBlock>
      <AddIntput
        data-testid="new-todo-input"
        type="text"
        placeholder="Todo를 입력해 주세요."
        value={todoItem.todo}
        onChange={(e) => setTodoItem({ todo: e.target.value })}
        autoFocus
      ></AddIntput>
      <AddBtn data-testid="new-todo-add-button" onClick={addBtn}>
        추가
      </AddBtn>
    </TodoAddBlock>
  );
};

export default AddTodo;

const TodoAddBlock = styled.div`
  margin-top: 100px;
  width: 500px;
`;

const AddIntput = styled.input`
  width: 300px;
  height: 30px;
  border: none;
  border-bottom: 2px solid black;
  padding-left: 10px;
`;

const AddBtn = styled.button`
  margin-left: 10px;
  padding: 8px 10px;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: 600;

  &:hover {
    cursor: pointer;
    background-color: #e9e9e9;
  }
`;
