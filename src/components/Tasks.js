import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles.css'; // Import the styles

const Tasks = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('low'); // default priority
  const [deadline, setDeadline] = useState('')
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/tasks', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, [token]);

  const addTask = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/tasks', {
        title,
        description,
        priority,
        deadline
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setTasks([...tasks, response.data]);
      setTitle('');
      setDescription('');
      setPriority('low');
      setDeadline('')
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  return (
    <div className="container">
      <h2>Tasks</h2>
      <form onSubmit={addTask}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
         <div>
                <label htmlFor="priority">Priority:</label>
                <select
                    id="priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    required
                >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </select>
            </div>
            <div>
                <label htmlFor="deadline">Deadline:</label>
                <input
                    type="date"
                    id="deadline"
                    value={deadline}
                    onChange={(e) => setDeadline(e.target.value)}
                />
            </div>
        <button type="submit">Add Task</button>
      </form>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>{task.title} - {task.description}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tasks;
