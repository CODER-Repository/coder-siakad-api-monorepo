<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Announcement extends Model
{
    protected $table = 'announcement';

    protected $primaryKey = 'announcement_id';

    protected $keyType = 'string';

    public $incrementing = false;

    protected $fillable = [
        'announcement_id',
        'title',
        'content',
        'type',
        'priority',
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->{$model->getKeyName()} = Str::uuid();
        });
    }
}
