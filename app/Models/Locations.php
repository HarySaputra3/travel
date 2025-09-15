<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Locations extends Model
{
    use HasFactory;
    protected $table = 'locations';

    protected $fillable = [
        'image',
        'title',
        'description',
        'officehour',
        'category_id',
        'region_id',
        'phone',
        'address',
        'latitude',
        'longitude'
    ];

    protected $appends = ['image_urls'];

    public function getImageUrlsAttribute ()
    {
        if ($this->image){
            return[];
        }

        return array_map (function($image){
            return asset('storage/'. $image);
        }, explode('|', $this->image));
    }

    public function category(){
        return $this->BelongsTo(Categories::class, 'category_id');
    }

    public function ticket (){
        return $this->belongsToMany(Ticket::class, 'location_ticket', 'location_id', 'ticket_id')
        ->withPivot('ticket_category_id')
        ->withTimestamps();
    }

    public function reviews (){
        return $this->hasMany(Reviews::class, 'location_id');
    }

    public function getTicketGroupByCategory(){
        return $this->tickets->grouptby(function($ticket){
            return $ticket->pivot->ticket_category_id;
        });
    }

    public function region (){
        return $this->belongsTo(Region::class);
    }
}
