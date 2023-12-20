import React from 'react';
import TaskItem from './TaskItem';
import './TaskList.css';

function TaskList({ tasks, onEdit, onTaskUpdated }) {
    return (
        <div id="tasklist">
            {tasks && tasks.length > 0 ? (
                tasks.map(task => (
                    <TaskItem key={task.id} task={task} onEdit={() => onEdit(task)} onTaskUpdated={onTaskUpdated} />
                ))
            ) : (
                <p>Apparently, there's nothing to do.</p>
            )}
        </div>
    );
}


export default TaskList;
