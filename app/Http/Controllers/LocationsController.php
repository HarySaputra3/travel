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

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $categories = Categories::orderBy('name', 'ASC')->get();
        $tickets = Ticket::orderByRaw('CAST(SUBSTRING_INDEX(ticket_code, "T", -1)AS UNSIGNED ASC')->get();

        return inertia('Locations/Create', [
            'categories' => $categories,
            'tickets' => $tickets,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
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
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        $imagePaths = [];

        //upload all pic
        foreach ($request->file('image') as $imageFile) {
            $path = $imageFile->store('images', 'public');
            $imagePaths[] = $path;
        }
        // Perintah untuk menyimpan data ke database
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

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Locations $location)
    {
        $categories = Categories::orderBy('name', 'ASC')->get();
        $tickets = Ticket::orderByRaw('CAST(SUBSTRING_INDEX(ticket_code, "T", -1)AS UNSIGNED ASC')->get();

        return inertia('Locations/Edit', [
            'location' => $location,
            'categories' => $categories,
            'tickets' => $tickets,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Locations $location)
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
            'latitude' => 'required|numeric',
            'longitude' => 'required|numeric',
        ]);

        //delete all old pic
        if ($location->image) {
            $oldImages = explode('|', $location->image);
            foreach ($oldImages as $key => $oldImage) {
                if (Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->exists($oldImage);
                }
            }
        }

        $newImagePath = [];
        foreach ($request->file('image') as $imageFile) {
            $path = $imageFile->store('images', 'public');
            $newImagePath[] = $path;
        }

        //update db 
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
            'image' => implode('|', $newImagePath),
        ]);

        return to_route('locations.index');
    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Locations $location)
    {
        //delete all pic
        if ($location->image) {
            $images = explode('|', $location->image);
            foreach ($images as $image) {
                if (Storage::disk('public')->exists($image)){
                    Storage::disk('public')->delete($image);
                };

            }
        }

        //delete
        $location->delete();
        return back();
    }
    
}
