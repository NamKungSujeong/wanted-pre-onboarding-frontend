import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";
import Api from "../utils/Api";
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
  });

  // read
  useEffect(() => {
    const getTodo = async () => {
      await Api.get("/todos").then((res) => {
        console.log(res);
        setTodoItems(res.data);
      });
    };
    getTodo();
  }, []);

  // create
  const addTodo = async (createTodo) => {
    await Api.post("/todos", createTodo, {
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      console.log(res);
      setTodoItems([...todoItems, res.data]);
    });
  };

  //update
  const updateTodo = async (updateItem) => {
    await Api({
      method: "put",
      url: `/todos/${updateItem.id}`,
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        todo: updateItem.todo,
        isCompleted: updateItem.isCompleted,
      }),
    }).then((res) => {
      console.log(res);
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

  //delete
  const deleteTodo = async (deleteItem) => {
    await Api.delete(`/todos/${deleteItem.id}`).then((res) => console.log(res));
    let newTodoItems = todoItems.filter((todo) => todo.id !== deleteItem.id);
    setTodoItems(newTodoItems);
  };

  let todoCount = todoItems.filter((todonum) => todonum.isCompleted === false);

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <TodoPage>
      <AddTodo addTodo={addTodo} />
      <TodoCountSection>📍 {todoCount.length} todos</TodoCountSection>
      <TodoListUl>
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
      </TodoListUl>
      <Link to="/">
        <HomeBtn>홈</HomeBtn>
      </Link>
      <LogOutBtn onClick={logOut}>로그아웃</LogOutBtn>
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

const TodoListUl = styled.ul`
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

const TodoCountSection = styled.section`
  margin-top: 20px;
`;
