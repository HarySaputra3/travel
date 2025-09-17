<?php

namespace App\Http\Controllers;

use App\Models\Reviews;
use App\Models\Transaction;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index(Request $request)
    {
        $reviews = Reviews::with(['user', 'location', 'transaction'])
            ->paginate(10)
            ->withQueryString();

        return inertia('Reviews/Index', [
            'reviews' => $reviews,
            'filters' => $request->only('search'),
            'can' => [
                'edit' => true,   // nanti bisa dihubungkan ke policy/permission
                'delete' => true,
            ],
        ]);
    }

    public function create()
    {
        $transactions = Transaction::with('location')->get();

        return inertia('Reviews/Create', [
            'transactions' => $transactions,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'transaction_id' => 'required|exists:transactions,id',
            'location_id' => 'required|exists:locations,id',
            'review' => 'required|string',
            'rate_kebersihan' => 'required|integer|min:1|max:5',
            'rate_keakuratan' => 'required|integer|min:1|max:5',
            'rate_checkin' => 'required|integer|min:1|max:5',
            'rate_komunikasi' => 'required|integer|min:1|max:5',
            'rate_lokasi' => 'required|integer|min:1|max:5',
            'rate_nilaiekonomis' => 'required|integer|min:1|max:5',
        ]);

        $validated['user_id'] = auth()->id();

        Reviews::create($validated);

        return redirect()->route('reviews.index')->with('success', 'Review berhasil ditambahkan.');
    }

    public function edit(Reviews $review)
    {
        $review->load(['transaction.location', 'user']);

        return inertia('Reviews/Edit', [
            'review' => $review,
        ]);
    }

    public function update(Request $request, Reviews $review)
    {
        $validated = $request->validate([
            'review' => 'required|string',
            'rate_kebersihan' => 'required|integer|min:1|max:5',
            'rate_keakuratan' => 'required|integer|min:1|max:5',
            'rate_checkin' => 'required|integer|min:1|max:5',
            'rate_komunikasi' => 'required|integer|min:1|max:5',
            'rate_lokasi' => 'required|integer|min:1|max:5',
            'rate_nilaiekonomis' => 'required|integer|min:1|max:5',
        ]);

        $review->update($validated);

        return redirect()->route('reviews.index')->with('success', 'Review berhasil diupdate.');
    }

    public function destroy(Reviews $review)
    {
        $review->delete();

        return redirect()->route('reviews.index')->with('success', 'Review berhasil dihapus.');
    }
}
