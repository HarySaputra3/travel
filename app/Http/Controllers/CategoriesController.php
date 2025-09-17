<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class CategoriesController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:categories index', only: ['index']),
            new Middleware('permission:categories create', only: ['create', 'store']),
            new Middleware('permission:categories edit', only: ['edit', 'update']),
            new Middleware('permission:categories delete', only: ['destroy'])
        ];
    }

    public function index(Request $request)
    {
        $categories = Categories::select('id', 'name', 'image')
            ->when($request->search, fn($query, $search) => $query->where('name', 'like', "%{$search}%"))
            ->orderBy('name', 'ASC')
            ->paginate(10)
            ->withQueryString();

        return inertia('Categories/Index', [
            // REVISI: 'auth' tidak perlu dikirim manual, Inertia sudah otomatis menanganinya.
            // Biarkan HandleInertiaRequests.php yang mengatur data auth.
            'categories' => $categories,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        return inertia('Categories/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:categories,name',
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('categories', 'public');
        }

        Categories::create([
            'name' => $request->name,
            'image' => $imagePath,
        ]);

        return to_route('categories.index')->with('success', 'Category created successfully!');
    }

    public function edit(Categories $category)
    {
        return inertia('Categories/Edit', [
            'category' => $category,
        ]);
    }

    public function update(Request $request, Categories $category)
    {
        $request->validate([
            'name' => 'required|min:3|max:255|unique:categories,name,' . $category->id,
            'image' => 'nullable|image|mimes:jpg,png,jpeg,gif|max:2048',
        ]);

        $imagePath = $category->image;
        if ($request->hasFile('image')) {
            // Hapus gambar lama jika ada
            if ($category->image) {
                Storage::disk('public')->delete($category->image);
            }
            // Simpan gambar baru
            $imagePath = $request->file('image')->store('categories', 'public');
        }

        $category->update([
            'name' => $request->name,
            'image' => $imagePath,
        ]);

        return to_route('categories.index')->with('success', 'Category updated successfully!');
    }

    public function destroy(Categories $category)
    {
        if ($category->image) {
            Storage::disk('public')->delete($category->image);
        }

        $category->delete();

        return back()->with('success', 'Category successfully deleted');
    }
}