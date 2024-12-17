<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TodoController extends Controller
{
    // Menampilkan daftar To-Do
    public function index()
    {
        $todos = Todo::all();
        return Inertia::render('TodoList', [
            'todos' => $todos,
        ]);
    }

    // Menyimpan To-Do baru
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string|max:1000',
        ]);

        Todo::create([
            'title' => $request->title,
            'description' => $request->description,
            'completed' => false, // Status default adalah belum selesai
        ]);

        return redirect()->route('todos.index');
    }

    // Memperbarui status To-Do
    public function update(Request $request, Todo $todo)
    {
        // Validasi agar completed hanya berupa boolean
        $request->validate([
            'completed' => 'required|boolean',
        ]);

        // Update status completed
        $todo->update([
            'completed' => $request->completed,
        ]);

        return redirect()->route('todos.index');
    }

    // Menghapus To-Do
    public function destroy(Todo $todo)
    {
        $todo->delete();
        return redirect()->route('todos.index');
    }
}
