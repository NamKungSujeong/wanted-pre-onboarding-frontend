import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";
import client from "../utils/Api";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

const Todo = () => {
  const [todoItems, setTodoItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("access_token") === null) {
      navigate("/signin");
      return;
    }
    //Read
    const getTodo = async () => {
      const res = await client.get("/todos");
      console.log(res);
      setTodoItems(res.data);
    };
    getTodo();
  });

  //Create

  const createTodo = async (createItem) => {
    const res = await client.post("/todos", createItem, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTodoItems([...todoItems, res.data]);
  };

  //Update

  const updateTodo = async (updateItem) => {
    await client({
      method: "put",
      url: `/todos/${updateItem.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        todo: updateItem.todo,
        isCompleted: updateItem.isCompleted,
      }),
    }).then(() => {
      setTodoItems(
        todoItems.map((item) =>
          item.id === updateItem.id
            ? {
                ...item,
                todo: updateItem.todo,
                isCompleted: updateItem.isCompleted,
              }
            : item
        )
      );
    });
  };

  // Delete
  const deleteTodo = async (deleteItem) => {
    await client
      .delete(`/todos/${deleteItem.id}`)
      .then((res) => console.log(res));
    let newTodoItems = todoItems.filter((todo) => todo.id !== deleteItem.id);
    setTodoItems(newTodoItems);
  };

  let todoCount = todoItems.filter((todonum) => todonum.isCompleted === false);

  const LogOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <TodoPage>
      <AddTodo addTodo={createTodo} />
      <TodoCount>📍 {todoCount.length} todos</TodoCount>
      <TodoListBlock>
        {todoItems.length > 0 ? (
          todoItems.map((todo) => {
            return (
              <TodoList
                key={todo.id}
                todo={todo}
                updateTodo={updateTodo}
                deleteTodo={deleteTodo}
              />
            );
          })
        ) : (
          <div>Todo를 추가해 주세요</div>
        )}
      </TodoListBlock>
      <LogOutBtn onClick={LogOut}>로그아웃</LogOutBtn>
      <Link to="/">
        <HomeBtn>홈</HomeBtn>
      </Link>
    </TodoPage>
  );
};

export default Todo;

const TodoPage = styled.main`
  width: 450px;
  margin: auto;
  display: flex;
  flex-direction: column;
`;

const TodoListBlock = styled.div`
  margin: 15px 0;
`;

const LogOutBtn = styled.button`
  margin-top: 15px;
  padding: 10px 0;
  background-color: #fff;
  border: 1px solid black;
  border-radius: 5px;
  font-weight: 500;

  &:hover {
    cursor: pointer;
    background-color: #e9e9e9;
  }
`;

const HomeBtn = styled(LogOutBtn)`
  width: 450px;
`;

const TodoCount = styled.div`
  margin-top: 20px;
`;
