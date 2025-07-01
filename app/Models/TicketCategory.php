<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class TicketCategory extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'ticket_categories';
    
    protected $fillable = [
        'name'
    ];

    public function category()
    {
        return $this->belongTo(Ticket::class, 'ticket_category_id');
    }


}
