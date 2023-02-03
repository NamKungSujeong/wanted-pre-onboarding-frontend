import { useEffect } from "react";
import client from "../shared/Request";

const AddTodo = () => {
  // const [todoItems, setTodoItems] = useState([]);

  useEffect(() => {
    const getTodo = () => {
      client.get("/todos").then((res) => {
        console.log(res);
      });
    };
    getTodo();
  });

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
      />
      <button data-testid="new-todo-add-button">추가</button>

      <button onClick={LogOut}>로그아웃</button>
    </div>
  );
};

export default AddTodo;
