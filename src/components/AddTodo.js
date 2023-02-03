const AddTodo = () => {
  const LogOut = () => {
    localStorage.getItem("access_token");
    localStorage.clear();
    window.location.replace("http://localhost:3001/");
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
