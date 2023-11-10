<?php

namespace App\Models;

use Chatify\Traits\UUID;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * @method static create(array $array)
 * @method static count()
 * @method static truncate()
 */
class Notify extends Model
{
    use HasFactory;
    use UUID;

    protected $fillable = [
        'title',
        'body',
        'isRead'
    ];


}
