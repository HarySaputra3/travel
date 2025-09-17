<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;

class TransactionController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('permission:transactions index', only: ['index']),
        ];
    }

    public function index(Request $request)
    {
        $user = auth()->user();

        $transactions = Transaction::with(['user', 'ticket'])
            // Filter: Hanya tampilkan transaksi milik user yang sedang login jika bukan admin
            ->when(!$user->hasRole('admin'), function ($query) use ($user) {
                return $query->where('user_id', $user->id);
            })
            // Filter: Logika pencarian
            ->when($request->search, function ($query, $search) {
                // REVISI: Pencarian berdasarkan kode transaksi atau ID eksternal
                $query->where('code', 'like', "%{$search}%")
                    ->orWhere('external_id', 'like', "%{$search}%");
            })
            ->latest()
            ->paginate(10) // Tampilkan 10 data per halaman
            ->withQueryString();

        return inertia('Transactions/Index', [
            // REVISI: Nama prop diubah menjadi 'transactions' (plural) agar konsisten
            'transactions' => $transactions,
            'filters' => $request->only(['search'])
        ]);
    }
}