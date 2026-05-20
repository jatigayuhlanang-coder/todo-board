import { useState, KeyboardEvent } from 'react';

interface Task {
  id: string;
  text: string;
  status: 'todo' | 'doing' | 'done';
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const addTask = (): void => {
    if (inputValue.trim() === '') return;
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      text: inputValue,
      status: 'todo', // Default masuk ke To Do
    };

    setTasks([...tasks, newTask]);
    setInputValue('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  // Filter task berdasarkan status untuk mempermudah perhitungan & tampilan
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const doingTasks = tasks.filter(t => t.status === 'doing');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="bg-[#0b1329] text-white min-h-screen py-12 px-4 font-sans selection:bg-cyan-500 selection:text-white">
      
      {/* 1. Header / Judul */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold tracking-wide flex items-center justify-center gap-2">
          📄 Todo Board
        </h1>
        <p className="text-xs text-gray-400 mt-2">
          Tasks: {tasks.length} | Input: "{inputValue}"
        </p>
      </div>

      {/* 2. Form Input */}
      <div className="max-w-md mx-auto flex gap-2 mb-6">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Tambah task baru..."
          className="flex-1 px-4 py-2 rounded-lg bg-gray-800/60 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-500 transition-colors text-sm"
        />
        <button
          onClick={addTask}
          className="px-5 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg font-medium text-white text-sm transition-colors"
        >
          + Add
        </button>
      </div>

      {/* 3. Badge Status Counter Atas */}
      <div className="flex justify-center gap-3 mb-8 text-xs font-medium">
        <span className="px-3 py-1.5 rounded-md bg-blue-950/40 border border-blue-900/50 text-blue-400 flex items-center gap-1.5">
          📄 Todo: <span className="font-bold">{todoTasks.length}</span>
        </span>
        <span className="px-3 py-1.5 rounded-md bg-amber-950/40 border border-amber-900/50 text-amber-400 flex items-center gap-1.5">
          🔥 Doing: <span className="font-bold">{doingTasks.length}</span>
        </span>
        <span className="px-3 py-1.5 rounded-md bg-emerald-950/40 border border-emerald-900/50 text-emerald-400 flex items-center gap-1.5">
          ✅ Done: <span className="font-bold">{doneTasks.length}</span>
        </span>
      </div>

      {/* 4. Kanban Board Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 px-2">
        
        {/* Kolom TO DO */}
        <div className="bg-[#141d33] border-t-4 border-blue-500 rounded-xl p-4 shadow-xl min-h-[250px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-sm flex items-center gap-2 text-gray-200">
              📄 To Do
            </h2>
            <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full font-bold">
              {todoTasks.length}
            </span>
          </div>
          <div className="flex-1 space-y-2">
            {todoTasks.length === 0 ? (
              <p className="text-gray-600 text-xs text-center my-auto pt-12">No tasks yet</p>
            ) : (
              todoTasks.map(task => (
                <div key={task.id} className="p-3 bg-[#1c2742] border border-gray-700/40 rounded-lg text-xs text-gray-300">
                  {task.text}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom IN PROGRESS */}
        <div className="bg-[#141d33] border-t-4 border-amber-500 rounded-xl p-4 shadow-xl min-h-[250px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-sm flex items-center gap-2 text-gray-200">
              🔥 In Progress
            </h2>
            <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full font-bold">
              {doingTasks.length}
            </span>
          </div>
          <div className="flex-1 space-y-2">
            {doingTasks.length === 0 ? (
              <p className="text-gray-600 text-xs text-center my-auto pt-12">No tasks yet</p>
            ) : (
              doingTasks.map(task => (
                <div key={task.id} className="p-3 bg-[#1c2742] border border-gray-700/40 rounded-lg text-xs text-gray-300">
                  {task.text}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Kolom DONE */}
        <div className="bg-[#141d33] border-t-4 border-emerald-500 rounded-xl p-4 shadow-xl min-h-[250px] flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-sm flex items-center gap-2 text-gray-200">
              ✅ Done
            </h2>
            <span className="bg-gray-800 text-gray-400 text-xs px-2 py-0.5 rounded-full font-bold">
              {doneTasks.length}
            </span>
          </div>
          <div className="flex-1 space-y-2">
            {doneTasks.length === 0 ? (
              <p className="text-gray-600 text-xs text-center my-auto pt-12">No tasks yet</p>
            ) : (
              doneTasks.map(task => (
                <div key={task.id} className="p-3 bg-[#1c2742] border border-gray-700/40 rounded-lg text-xs text-gray-300 line-through opacity-60">
                  {task.text}
                </div>
              ))
            )}
          </div>
        </div>

      </div>

    </div>
  );
}

export default App;              
