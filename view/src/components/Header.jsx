import { useState } from 'react'
import "./Header.css";

function Header({ onAddTask, changeSort, currentSortLabel, categories, onCategoryChange, selectedCategory }) {
    //const [count, setCount] = useState(0)
    //create state hooks for each button to handle the sort/filter
    return (
    <div id="header">
        <div id="header-title">
            <h1>TO DO</h1>
            <button onClick={onAddTask}>+</button>
        </div>
        <button onClick={changeSort}>Sort: {currentSortLabel}</button>
        <select onChange={(e) => onCategoryChange(e.target.value)} value={selectedCategory || ''}>
            <option value="">All Categories</option>
            {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name}</option>
            ))}
        </select>
    </div>
    )
}

export default Header