import React, { useState, useEffect } from 'react';
import './App.css';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

function App() {
  const [allTodos, setTodos] = useState([]);
  const [newDescription, setNewDescription] = useState('');
  const [completedTodos, setCompletedTodos] = useState([]);

  const handleAddTodo = () => {
    if (newDescription.trim() !== "") {  
      let newTodoItem = {
        description: newDescription,
      };

      let updatedTodoArr = [...allTodos];
      updatedTodoArr.push(newTodoItem);
      setTodos(updatedTodoArr);
      localStorage.setItem('todolist', JSON.stringify(updatedTodoArr));

     
      setNewDescription('');
    }
  };

  const handleDeleteTodo = index => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);
  };

  const handleDeleteCompletedTodo = index => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1);

    localStorage.setItem('completedTodos', JSON.stringify(reducedTodo));
    setCompletedTodos(reducedTodo);
  };

  const handleCompleteTodo = (index) => {
    const completedTodo = allTodos[index];

    let updatedCompletedTodos = [...completedTodos];
    updatedCompletedTodos.push(completedTodo);
    localStorage.setItem('completedTodos', JSON.stringify(updatedCompletedTodos));
    setCompletedTodos(updatedCompletedTodos);

    let updatedTodos = [...allTodos];
    updatedTodos.splice(index, 1);
    localStorage.setItem('todolist', JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem('todolist'));
    let savedCompletedTodo = JSON.parse(localStorage.getItem('completedTodos'));
    if (savedTodo) {
      setTodos(savedTodo);
    }

    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);

  return (
    <div className="App">
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <br />
            <input
              type="text"
              className="td"
              value={newDescription}
              onChange={e => setNewDescription(e.target.value)}
              placeholder="Add a new task"
            />
          </div>
          <div className="todo-input-item">
            <button
              type="button"
              onClick={handleAddTodo}
              className="primaryBtn"
            >
              <span>+</span>
            </button>
          </div>
        </div>

        <div className="todo-list">
          <h1>Tasks to do - {allTodos.length}</h1>

          {allTodos.map((item, index) => (
            <div className="todo-list-item1" key={index}>
              <div>
                <p>{item.description}</p>
              </div>

              <div>
                <BsCheckLg
                  className="check-icon"
                  title="Complete?"
                  onClick={() => handleCompleteTodo(index)} 
                />
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDeleteTodo(index)}
                  title="Delete?"
                />
              </div>
            </div>
          ))}

          <h1 className="done">Done - {completedTodos.length}</h1>

          {completedTodos.map((item, index) => (
            <div className="todo-list-item2" key={index}>
              <div>
                <p>{item.description}</p>
              </div>

              <div>
                <AiOutlineDelete
                  className="icon"
                  onClick={() => handleDeleteCompletedTodo(index)}
                  title="Delete?"
                />
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}

export default App
