import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import TaskList from './components/TaskList';
import NewTaskForm from './components/NewTaskForm';
import TimePieChart from './components/Pie';
import './App.css';

const sortOptions = [
  { value: 'noSort', label: 'No Sort' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'noRush', label: 'No Rush' },
  { value: 'important', label: 'Important' },
  { value: 'notImportant', label: 'Not Important' }
  
];



function App() {
    const [currentTask, setCurrentTask] = useState(null);
    const [isFormVisible, setIsFormVisible] = useState(false);
    const [tasks, setTasks] = useState([]);
    const [currentSort, setCurrentSort] = useState('noSort');
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [chartData, setChartData] = useState([]);


    const changeSort = () => {
      let currentIndex = sortOptions.findIndex(option => option.value === currentSort);
      let nextIndex = (currentIndex + 1) % sortOptions.length;
      setCurrentSort(sortOptions[nextIndex].value);
    };

    const processedTasks = useMemo(() => {
      let processedArray = [...tasks];
  
      switch (currentSort) {
        case 'urgent':
          // Sort by due date ascending (earlier dates first), nulls last. 
          // If due dates are equal, sort by numeric importance level descending (higher importance first)
          processedArray.sort((a, b) => {
              if (a.dueDate === null) return 1;
              if (b.dueDate === null) return -1;
              
              const dueDateA = new Date(a.dueDate);
              const dueDateB = new Date(b.dueDate);
              const dueDateDifference = dueDateA - dueDateB;

              if (dueDateDifference !== 0) return dueDateDifference;

              // Convert importance levels to numbers for comparison, if due dates are equal
              const importanceA = Number(a.importanceLevel);
              const importanceB = Number(b.importanceLevel);
              return importanceB - importanceA; // Descending order
          });
          break;

        case 'noRush':
          // Sort by due date descending, nulls first
          processedArray.sort((a, b) => {
              if (a.dueDate === null) return -1;
              if (b.dueDate === null) return 1;
              return new Date(b.dueDate).getTime() - new Date(a.dueDate).getTime();
          });
            break;
        case 'important':
            // Sort by importance level descending (higher importance first)
            processedArray.sort((a, b) => b.importanceLevel - a.importanceLevel);
            break;
        case 'notImportant':
          // Sort by importance level ascending (lower importance first), nulls in importanceLevel first
          processedArray.sort((a, b) => {
              if (a.importanceLevel === null) return -1;
              if (b.importanceLevel === null) return 1;
              return a.importanceLevel - b.importanceLevel;
          });
          break;
        case 'noSort':
        default:
            // No sorting applied
            break;
      }
  
      // Filter the sorted tasks by the selected category
      if (selectedCategory) {
          processedArray = processedArray.filter(task => task.CategoryId === parseInt(selectedCategory));
      }
  
      return processedArray;
    }, [tasks, currentSort, selectedCategory]);

    const fetchTasks = () => {
        fetch('http://localhost:3000/api/tasks')
          .then(response => response.json())
          .then(data => {
            // Assuming you have a state in App.js to hold tasks
            setTasks(data);
          });
    };

    const newCategories = ["School", "Work", "Personal"]; //Add custom categories

    const addCategory = async categoryName => {
      fetch('http://localhost:3000/api/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: categoryName })
      })
      .then(response => response.json())
      .catch(error => console.error("Error adding category:", error));
    };
    
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/category');
        const data = await response.json();
        if (data.length === 0) {
          for (const category of newCategories) {
            await addCategory(category);
          }
        }
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    
    

    const fetchTimeData = () => {
      fetch('http://localhost:3000/api/time/category-data')
        .then(response => response.json())
        .then(data => {
            setChartData(data);
        })
        .catch(error => console.error('Error fetching chart data:', error));
      };

    const handleEdit = (task) => {
        const editedTask = {
          ...task,
          dueDate: task.dueDate ? new Date(task.dueDate).toISOString().slice(0, 16) : ''
        };
        setCurrentTask(editedTask);
        setIsFormVisible(true);
      };

    const handleAddNew = () => {
    setCurrentTask(null);
    setIsFormVisible(true);
    };

    const resetForm = () => {
    setIsFormVisible(false);
    setCurrentTask(null);
    };

    useEffect(() => {
        fetchTasks();
        fetchCategories();
        fetchTimeData();
      }, []);

  return (
    <>
    <div id='app'>
      <Header 
        onAddTask={handleAddNew} 
        changeSort={changeSort} 
        currentSortLabel={sortOptions.find(option => option.value === currentSort).label}
        categories={categories} 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <TaskList tasks={processedTasks} onEdit={handleEdit} onTaskUpdated={fetchTasks} />

      {isFormVisible && (
        <NewTaskForm task={currentTask} onClose={resetForm} onTaskUpdated={fetchTasks} />
      )}
    </div>

    {chartData.length >= 1 ? (
                <div id="chart-container">
                    <h2>Percentage of Time Spent on Tasks by Category</h2>
                    <TimePieChart data={chartData} />
                </div>
            ) : (
                 <> </>
            )}
    </>
  );
}

export default App;
