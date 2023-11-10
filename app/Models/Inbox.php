<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(mixed $validated)
 * @property mixed $email
 */
class Inbox extends Model
{
    use HasFactory;

    protected $fillable = [
        'source',
        'fullname',
        'email',
        'company',
        'phone',
        'interest',
        'budget',
        'message'
    ];

}
