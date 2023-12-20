import React, { useState, useEffect } from 'react';
import "./NewTaskForm.css";

function NewTaskForm({ task, onClose, onTaskUpdated }) {
    const [newTask, setNewTask] = useState({
        title: '',
        description: '',
        dueDate: '',
        importanceLevel: '',
        CategoryId: ''
    });
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        if (task) {
            const taskToEdit = { ...task };
    
            if (taskToEdit.dueDate) {
                // Create a Date object from the UTC string
                const localDate = new Date(taskToEdit.dueDate + 'Z');
    
                // Manually construct the date string in local time
                const year = localDate.getFullYear();
                const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                const day = String(localDate.getDate()).padStart(2, '0');
                const hours = String(localDate.getHours()).padStart(2, '0');
                const minutes = String(localDate.getMinutes()).padStart(2, '0');
    
                // Combine the components into the required format
                taskToEdit.dueDate = `${year}-${month}-${day}T${hours}:${minutes}`;
            }
    
            setNewTask(taskToEdit);
        }

        fetch('http://localhost:3000/api/category')
            .then(response => response.json())
            .then(data => setCategories(data));
    }, [task]);

    const handleChange = (e) => {
        setNewTask({ ...newTask, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = task ? `http://localhost:3000/api/tasks/${task.id}` : 'http://localhost:3000/api/tasks';
        const method = task ? 'PUT' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTask)
        })
        .then(response => response.json())
        .then(data => {
            //console.log('Success:', data);
            //alert(`Successfully ${task ? 'updated' : 'created'}: ${data.title}`);
            onClose();
            onTaskUpdated();
        });
    };

    const handleDelete = () => {
        if (task && task.id) {
            fetch(`http://localhost:3000/api/tasks/${task.id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => {
                if (response.ok) {
                    // Optionally, alert user of successful deletion
                    onClose(); // Close form
                    onTaskUpdated(); // Update task list
                } else {
                    // Handle error response
                }
            });
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <label>
                <b>Title:</b>
                <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                <b>Description:</b>
                <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleChange}
                />
            </label>
            <label>
                <b>Due Date:</b>
                <input
                    type="datetime-local"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleChange}
                />
            </label>
            <label>
            <b>Importance Level:</b>
                <input
                    type="text"
                    name="importanceLevel"
                    value={newTask.importanceLevel}
                    onChange={handleChange}
                />
            </label>
            <label>
            <b>Category:</b>
                <select 
                    name="CategoryId" 
                    value={newTask.CategoryId} 
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a Category</option>
                    {categories.map(category => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </label>
            <div id="form-buttons">
                <button type="submit" >{task ? 'Save' : 'Create'}</button>
                <button type="button" onClick={onClose}>Cancel</button>
                {task && (
                    <button type="button" onClick={handleDelete}>Delete</button>
                )}
            </div>
        </form>
    );
}

export default NewTaskForm;
