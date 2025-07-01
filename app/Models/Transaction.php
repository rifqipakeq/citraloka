<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $table = 'transactions';

    protected $fillabel = [
        'code',
        'external_id',
        'checkout_link',
        'payment_method',
        'payment_status',
        'user_id',
        'ticket_id',
        'price_per_pack',
        'location_id',
        'validation_token',
        'qty',
        'ppn',
        'total'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

    public function ticket()
    {
        return $this->belongsTo(Ticket::class, 'ticket_id');
    }
    public function location()
    {
        return $this->belongsTo(Locations::class, 'location_id');
    }
}
