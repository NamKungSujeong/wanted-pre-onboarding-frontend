import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import { useEffect, useState } from "react";
import client from "../shared/Request";

const Todo = () => {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    console.log("랜더링 성공");
    const getTodo = async () => {
      await client.get("/todos").then((res) => {
        console.log(res.data);
        setTodoItems(res.data);
      });
    };
    getTodo();
  }, []);

  const addTodo = async (createTodo) => {
    await client
      .post("/todos", createTodo, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setTodoItems([...todoItems, res.data]);
      });
  };

  return (
    <div>
      <AddTodo addTodo={addTodo} />
      {todoItems.length > 0 ? (
        todoItems.map((todo) => {
          return <TodoList key={todo.id} todo={todo} />;
        })
      ) : (
        <div>Todo를 추가해 주세요</div>
      )}
    </div>
  );
};

export default Todo;
