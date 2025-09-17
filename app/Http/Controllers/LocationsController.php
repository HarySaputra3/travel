<?php

namespace App\Http\Controllers;

use App\Models\Categories;
use App\Models\Locations;
use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\Storage;

class LocationsController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:locations index', only: ['index']),
            new Middleware('permission:locations create', only: ['create', 'store']),
            new Middleware('permission:locations edit', only: ['edit', 'update']),
            new Middleware('permission:locations delete', only: ['destroy'])
        ];
    }

    public function index(Request $request)
    {
        $locations = Locations::with(['category', 'ticket'])
            ->when($request->search, fn($query) => $query->where('title', 'like', '%' . $request->search . '%'))
            ->orderBy('title', 'ASC')
            ->paginate(5);

        return inertia('Locations/Index', [
            'locations' => $locations,
            'filters' => $request->only(['search'])
        ]);
    }

    public function create()
    {
        $categories = Categories::orderBy('name', 'ASC')->get();
        $tickets = Ticket::orderByRaw('CAST(SUBSTRING_INDEX(ticket_code, "T", -1) AS UNSIGNED) ASC')->get();

        return inertia('Locations/Create', [
            'categories' => $categories,
            'tickets' => $tickets,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'image' => 'required|array',
            'image.*' => 'image|mimes:jpeg,png,jpg',
            'description' => 'required|string',
            'officehours' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'ticket_id' => 'required|exists:tickets,id',
            'phone' => 'required|string',
            'address' => 'required|string',
            // REVISI: Validasi diperkuat untuk mencegah nilai koordinat yang tidak valid
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
        ]);

        $imagePaths = [];

        foreach ($request->file('image') as $imageFile) {
            $path = $imageFile->store('images', 'public');
            $imagePaths[] = $path;
        }

        Locations::create([
            'title' => $request->title,
            'description' => $request->description,
            'officehours' => $request->officehours,
            'category_id' => $request->category_id,
            'ticket_id' => $request->ticket_id,
            'phone' => $request->phone,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'image' => implode('|', $imagePaths),
        ]);

        return to_route('locations.index');
    }

    public function edit(Locations $location)
    {
        $categories = Categories::orderBy('name', 'ASC')->get();
        $tickets = Ticket::orderByRaw('CAST(SUBSTRING_INDEX(ticket_code, "T", -1) AS UNSIGNED) ASC')->get();

        $location->load(['category', 'ticket']);

        return inertia('Locations/Edit', [
            'location' => $location,
            'categories' => $categories,
            'tickets' => $tickets,
        ]);
    }

    public function update(Request $request, Locations $location)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'officehours' => 'required|string',
            'category_id' => 'required|exists:categories,id',
            'ticket_id' => 'required|exists:tickets,id',
            'phone' => 'required|string',
            'address' => 'required|string',
            // REVISI: Validasi diperkuat untuk mencegah nilai koordinat yang tidak valid
            'latitude' => 'required|numeric|between:-90,90',
            'longitude' => 'required|numeric|between:-180,180',
            'image' => 'nullable|array',
            'image.*' => 'image|mimes:jpeg,png,jpg',
        ]);

        // Inisialisasi imagePaths dengan gambar yang sudah ada
        $imagePaths = $location->image ? explode('|', $location->image) : [];

        // Cek jika ada file gambar baru yang di-upload untuk menggantikan yang lama
        if ($request->hasFile('image')) {
            // Hapus semua gambar lama dari storage
            if ($location->image) {
                $oldImages = explode('|', $location->image);
                foreach ($oldImages as $oldImage) {
                    if (Storage::disk('public')->exists($oldImage)) {
                        Storage::disk('public')->delete($oldImage);
                    }
                }
            }

            // Upload gambar baru dan siapkan path-nya
            $newImagePaths = [];
            foreach ($request->file('image') as $imageFile) {
                $path = $imageFile->store('images', 'public');
                $newImagePaths[] = $path;
            }
            $imagePaths = $newImagePaths;
        }

        // Update data di database
        $location->update([
            'title' => $request->title,
            'description' => $request->description,
            'officehours' => $request->officehours,
            'category_id' => $request->category_id,
            'ticket_id' => $request->ticket_id,
            'phone' => $request->phone,
            'address' => $request->address,
            'latitude' => $request->latitude,
            'longitude' => $request->longitude,
            'image' => implode('|', $imagePaths),
        ]);

        return to_route('locations.index');
    }

    public function destroy(Locations $location)
    {
        if ($location->image) {
            $images = explode('|', $location->image);
            foreach ($images as $image) {
                if (Storage::disk('public')->exists($image)) {
                    Storage::disk('public')->delete($image);
                }
            }
        }

        $location->delete();
        return back();
    }
}