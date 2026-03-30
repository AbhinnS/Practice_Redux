import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTodo, toggleTodo, deleteTodo } from './features/todoSlice';

function App() {
  const [input, setInput] = useState('');
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const handleAdd = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addTodo(input));
      setInput('');
    }
  };

  const completedCount = todos.filter(t => t.completed).length;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        
        <h1 style={styles.title}>Task Manager</h1>

        <p style={styles.subtitle}>
          {completedCount} / {todos.length} Completed
        </p>

        {/* Input */}
        <form onSubmit={handleAdd} style={styles.form}>
          <input
            style={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new task..."
          />
          <button style={styles.addBtn}>Add</button>
        </form>

        {/* List */}
        <ul style={styles.list}>
          {todos.length === 0 ? (
            <p style={styles.empty}>No tasks yet 🚀</p>
          ) : (
            todos.map((todo) => (
              <li key={todo.id} style={styles.todoItem}>
                
                <span
                  onClick={() => dispatch(toggleTodo(todo.id))}
                  style={{
                    ...styles.todoText,
                    textDecoration: todo.completed ? 'line-through' : 'none',
                    color: todo.completed ? '#888' : '#000'
                  }}
                >
                  {todo.text}
                </span>

                <button
                  onClick={() => dispatch(deleteTodo(todo.id))}
                  style={styles.deleteBtn}
                >
                  ✕
                </button>

              </li>
            ))
          )}
        </ul>

      </div>
    </div>
  );
}

export default App;


const styles = {
  container: {
    minHeight: '100vh',
    background: '#f4f6f8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  card: {
    background: '#fff',
    padding: '30px',
    borderRadius: '12px',
    width: '400px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
  },

  title: {
    marginBottom: '5px',
    fontSize: '24px',
    fontWeight: 'bold',
  },

  subtitle: {
    marginBottom: '20px',
    color: '#666',
  },

  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },

  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    outline: 'none',
  },

  addBtn: {
    background: '#4f46e5',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '8px',
    cursor: 'pointer',
  },

  list: {
    listStyle: 'none',
    padding: 0,
  },

  todoItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
  },

  todoText: {
    cursor: 'pointer',
    fontSize: '16px',
  },

  deleteBtn: {
    background: 'red',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    padding: '5px 10px',
    cursor: 'pointer',
  },

  empty: {
    textAlign: 'center',
    color: '#999',
  },
};