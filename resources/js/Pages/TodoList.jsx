import React, { useState, useEffect } from 'react';
import { Inertia } from '@inertiajs/inertia';

const TodoList = ({ todos }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [editingTodo, setEditingTodo] = useState(null);

    // Fungsi untuk menambahkan To-Do
    const addTodo = () => {
        setLoading(true);
        Inertia.post('/todos', { title, description }, {
            onFinish: () => {
                setLoading(false);
                setTitle('');
                setDescription('');
            }
        });
    };

    // Fungsi untuk memperbarui status To-Do
    const updateTodo = (id, newTitle, newDescription) => {
        setLoading(true);
        Inertia.put(`/todos/${id}`, { title: newTitle, description: newDescription }, {
            onFinish: () => {
                setLoading(false);
                setEditingTodo(null);
            }
        });
    };

    // Fungsi untuk menghapus To-Do
    const deleteTodo = (id) => {
        Inertia.delete(`/todos/${id}`);
    };

    // Fungsi untuk mengedit To-Do
    const startEditing = (todo) => {
        setEditingTodo(todo);
        setTitle(todo.title); // Mengisi title dengan nilai tugas yang dipilih
        setDescription(todo.description); // Mengisi deskripsi dengan nilai tugas yang dipilih
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 flex flex-col items-center justify-center p-6">
            <h1 className="text-5xl font-bold text-white mb-6">Your To-Do List</h1>

            {/* Form input untuk menambah To-Do */}
            <div className="mb-6 p-6 bg-gradient-to-r from-pink-400 to-red-400 rounded-lg shadow-lg w-full sm:w-96">
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter task title"
                />
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="Enter task description"
                />
                <button
                    onClick={addTodo}
                    disabled={loading}
                    className={`w-full py-3 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-pink-600 hover:bg-pink-700'} transition duration-300`}
                >
                    {loading ? 'Adding...' : 'Add Task'}
                </button>
            </div>

            {/* Daftar To-Do */}
            <div className="space-y-4 w-full sm:w-96">
                {todos.length === 0 ? (
                    <div className="text-center text-white">No tasks found!</div>
                ) : (
                    todos.map((todo) => (
                        <div key={todo.id} className="flex flex-col bg-white p-4 rounded-lg shadow-md">
                            {/* Jika sedang mengedit, tampilkan form edit */}
                            {editingTodo?.id === todo.id ? (
                                <div className="w-full space-y-4">
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Edit task title"
                                    />
                                    <textarea
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        className="w-full p-3 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                                        placeholder="Edit task description"
                                    />
                                    <div className="flex space-x-4">
                                        <button
                                            onClick={() => updateTodo(todo.id, title, description)}
                                            className="w-1/2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                                        >
                                            Save
                                        </button>
                                        <button
                                            onClick={() => setEditingTodo(null)}
                                            className="w-1/2 bg-gray-400 text-white py-2 rounded-lg hover:bg-gray-500"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="flex flex-col w-full">
                                        {/* Menampilkan judul tugas */}
                                        <span className={`text-xl font-medium ${todo.completed ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                                            {todo.title}
                                        </span>
                                        {/* Menampilkan deskripsi tugas di bawah judul */}
                                        <div className="text-sm text-gray-600 mt-2">
                                            {todo.description}
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-4 mt-4">
                                        <button
                                            onClick={() => startEditing(todo)} // Memulai proses edit dan mengisi form
                                            className="bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => deleteTodo(todo.id)}
                                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default TodoList;
