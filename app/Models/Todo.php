<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
    use HasFactory;

    // Menentukan kolom mana saja yang boleh diisi (mass assignable)
    protected $fillable = ['title', 'description', 'completed'];

    // Nilai default untuk atribut ketika tidak diberikan input
    protected $attributes = [
        'completed' => false, // Secara default, todo dianggap belum selesai
    ];

    // Casting tipe data untuk memastikan 'completed' selalu berbentuk boolean
    protected $casts = [
        'completed' => 'boolean', // Menjamin bahwa 'completed' adalah boolean
    ];

    // Fungsi untuk scope mengambil semua todos yang sudah selesai
    public function scopeCompleted($query)
    {
        return $query->where('completed', true);
    }

    // Fungsi untuk scope mengambil semua todos yang belum selesai
    public function scopeIncomplete($query)
    {
        return $query->where('completed', false);
    }
}
