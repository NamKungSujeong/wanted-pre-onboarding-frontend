import AddTodo from "../components/AddTodo";
import TodoList from "../components/TodoList";
import { useEffect, useState } from "react";
import client from "../shared/Request";

const Todo = () => {
  const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    console.log("랜더링 성공");
    const getTodo = async () => {
      const res = await client.get("/todos");
      setTodoItems(res.data);
    };
    getTodo();
  }, []);

  const addTodo = async (createTodo) => {
    const res = await client.post("/todos", createTodo, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    setTodoItems([...todoItems, res.data]);
  };

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
          item.id === updateItem.id ? { ...item, todo: updateItem.todo } : item
        )
      );
    });
  };

  console.log(todoItems);

  const deleteTodo = async (deleteItem) => {
    await client
      .delete(`/todos/${deleteItem.id}`)
      .then((res) => console.log(res));
    let newTodoItems = todoItems.filter((todo) => todo.id !== deleteItem.id);
    setTodoItems(newTodoItems);
  };

  return (
    <div>
      <AddTodo addTodo={addTodo} />
      {todoItems.length > 0 ? (
        todoItems.map((todos) => {
          return (
            <TodoList
              key={todos.id}
              todos={todos}
              updateTodo={updateTodo}
              deleteTodo={deleteTodo}
            />
          );
        })
      ) : (
        <div>Todo를 추가해 주세요</div>
      )}
    </div>
  );
};

export default Todo;
