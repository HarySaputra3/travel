<?php

namespace App\Http\Controllers;

use App\Models\Ticket;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class TicketController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:tickets index', only: ['index']),
            new Middleware('permission:tickets create', only: ['create', 'store']),
            new Middleware('permission:tickets edit', only: ['edit', 'update']),
            new Middleware('permission:tickets delete', only: ['destroy'])
        ];
    }

    public function index(Request $request)
    {
        $tickets = Ticket::select('id', 'ticket_code', 'name', 'price_per_pack', 'qty')
            ->when($request->search, fn($query) => $query->where('ticket_code', 'like', '%' . $request->search . '%'))
            // FIX: Mengurutkan berdasarkan ID terbaru lebih baik daripada `latest()` jika tidak ada timestamp
            ->orderBy('id', 'desc')
            ->paginate(5)
            ->withQueryString();

        // FIX: Perulangan ini tidak perlu dan bisa menyebabkan error jika kolom 'image' tidak di-select.
        // Dihapus karena tidak digunakan di frontend.

        return inertia('Tickets/Index', [
            'tickets' => $tickets,
            'filters' => $request->only('search')
        ]);
    }

    public function create()
    {
        return inertia('Tickets/Create');
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|in:Regular,VIP',
            'price_per_pack' => 'required|integer|min:0',
            'qty' => 'required|integer|min:1'
        ]);

        Ticket::create([
            'ticket_code' => 'T' . mt_rand(1000, 9999),
            'name' => $request->name,
            'price_per_pack' => $request->price_per_pack,
            'qty' => $request->qty,
        ]);

        return to_route('tickets.index')->with('success', 'Ticket created successfully');
    }

    public function edit(Ticket $ticket)
    {
        // FIX: Path view harusnya 'Tickets/Edit' (plural) sesuai konvensi.
        return inertia('Tickets/Edit', ['ticket' => $ticket]);
    }

    public function update(Request $request, Ticket $ticket)
    {
        $request->validate([
            // FIX: Aturan validasi `in` harus dipisah dengan koma.
            'name' => 'required|in:Regular,VIP',
            'price_per_pack' => 'required|integer|min:0',
            'qty' => 'required|integer|min:1'
        ]);

        $ticket->update([
            'name' => $request->name,
            'price_per_pack' => $request->price_per_pack,
            'qty' => $request->qty,
        ]);

        return to_route('tickets.index')->with('success', 'Ticket updated successfully');
    }

    public function destroy(Ticket $ticket)
    {
        $ticket->delete();
        return back()->with('success', 'Ticket deleted successfully');
    }
}