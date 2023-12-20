import React, { useState } from 'react';
import "./TaskItem.css";

function TaskItem({ task: initialTask, onEdit, onTaskUpdated }) {
    const [task, setTask] = useState(initialTask);

    const handleStartStop = () => {
        const currentDateTime = new Date().toISOString();

        if (!task.dateStart) {
            startTask(currentDateTime);
        } else {
            stopTask(currentDateTime);
        }
    }

    const startTask = (currentDateTime) => {
        // Update task with start date
        const updatedTask = {
            ...task,
            dateStart: currentDateTime,
        };

        setTask(updatedTask); // Update local state

        // PUT request to update the task
        fetch(`http://localhost:3000/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
        .then(response => response.json())
        .then(() => {
            // POST request to create a new time tracking record
            return fetch('http://localhost:3000/api/time', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    dateStart: currentDateTime,
                    CategoryId: task.CategoryId,
                    TaskId: task.id
                })
            });
        })
        .then(response => response.json())
        .then(() => {
            // Invoke the callback to update the task in the parent component
            onTaskUpdated();
        });
    }

    const stopTask = (currentDateTime) => {
        // Update task with stop date
        const updatedTask = {
            ...task,
            dateStop: currentDateTime,
        };
    
        setTask(updatedTask); // Update local state
    
        // PUT request to update the task
        fetch(`http://localhost:3000/api/tasks/${task.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedTask)
        })
        .then(response => response.json())
        .then(() => {
            // PUT request to update the time tracking record with stop date
            return fetch(`http://localhost:3000/api/time/task/${task.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dateStop: currentDateTime })
            });
        })
        .then(response => response.json())
        .then(() => {
            // Invoke the callback to update the task in the parent component
            onTaskUpdated();
        });
    }
    

    return (
        <div className="taskitem">
            <div className='taskitem-title'>
                <h3>{task.title}</h3>
                <button onClick={() => onEdit(task)}>...</button>
            </div>
            <button onClick={handleStartStop}>
                {task.dateStart && !task.dateStop ? 'Stop' : 'Start'}
            </button>
        </div>
    );
}

export default TaskItem;
