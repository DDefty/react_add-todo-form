import { useState } from 'react';
import './App.scss';

import usersFromServer from './api/users';
import todosFromServer from './api/todos';
import { TodoList } from './components/TodoList';

export const App = () => {
  const [title, setTitle] = useState('');
  const [user, setUser] = useState('');
  const [todos, setTodos] = useState(todosFromServer);
  const [isTitleValid, setIsTitleValid] = useState(true);
  const [isUserValid, setIsUserValid] = useState(true);

  const findUser = (name: string) => {
    return usersFromServer.find(userFind => userFind.name === name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Lepsze sprawdzanie walidacji z trim()
    const isTitleValidNow = title.trim().length > 0;
    const isUserValidNow = user.trim().length > 0;

    setIsTitleValid(isTitleValidNow);
    setIsUserValid(isUserValidNow);

    const tempTodos = [...todos];

    if (isTitleValidNow && isUserValidNow) {
      const maxId = Math.max(...todos.map(todo => todo.id));

      tempTodos.push({
        id: maxId + 1,
        title: title.trim(), // Używamy trim() przy zapisywaniu
        completed: false,
        userId: findUser(user)?.id ?? 0,
      });

      // Clear form after successful submission
      setTitle('');
      setUser('');
    }

    setTodos(tempTodos);
  };

  return (
    <div className="App">
      <h1>Add todo form</h1>

      <form onSubmit={handleSubmit}>
        <div className="field">
          <label htmlFor="titleInput">Title: </label>
          <input
            id="titleInput"
            type="text"
            data-cy="titleInput"
            value={title}
            onChange={e => {
              setTitle(e.target.value);
              if (e.target.value.trim().length > 0) {
                setIsTitleValid(true);
              }
            }}
            placeholder="Enter a title"
          />
          {!isTitleValid ? (
            <span className="error">Please enter a title</span>
          ) : null}
        </div>

        <div className="field">
          <label htmlFor="userSelect">User: </label>
          <select
            data-cy="userSelect"
            value={user}
            onChange={e => {
              setUser(e.target.value);
              if (e.target.value.trim().length > 0) {
                setIsUserValid(true);
              }
            }}
          >
            <option value="" disabled>
              Choose a user
            </option>
            {usersFromServer.map((us, index) => (
              <option key={index} value={us.name}>
                {us.name}
              </option>
            ))}
          </select>

          {!isUserValid ? (
            <span className="error">Please choose a user</span>
          ) : null}
        </div>

        <button type="submit" data-cy="submitButton">
          Add
        </button>
      </form>

      <TodoList todoList={todos} />
    </div>
  );
};
