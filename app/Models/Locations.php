<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Locations extends Model
{
    use HasFactory;
    protected $table = 'locations';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'image',
        'title',
        'description',
        'officehours', // FIX: 'officehour' diubah menjadi 'officehours' (PENYEBAB ERROR UTAMA)
        'category_id',
        'ticket_id',
        'phone',
        'address',
        'latitude',
        'longitude'
    ];

    protected $appends = ['image_urls'];

    /**
     * Accessor for image URLs.
     *
     * @return array
     */
    public function getImageUrlsAttribute(): array
    {
        // FIX: Logika dibalik, kembalikan array kosong jika TIDAK ADA gambar
        if (!$this->image) {
            return [];
        }

        return array_map(function ($image) {
            return asset('storage/' . $image);
        }, explode('|', $this->image));
    }

    /**
     * Get the category that owns the location.
     */
    public function category(): BelongsTo
    {
        // FIX: 'BelongsTo' diubah menjadi 'belongsTo' (camelCase)
        return $this->belongsTo(Categories::class, 'category_id');
    }

    /**
     * Get the ticket associated with the location.
     * PENTING: Pilih Opsi A atau Opsi B di atas yang sesuai dengan database Anda.
     * Kode ini menggunakan Opsi B agar konsisten dengan controller.
     */
    public function ticket(): BelongsTo
    {
        return $this->belongsTo(Ticket::class, 'ticket_id');
    }

    /**
     * Get the reviews for the location.
     */
    public function reviews(): HasMany
    {
        return $this->hasMany(Reviews::class, 'location_id');
    }
}