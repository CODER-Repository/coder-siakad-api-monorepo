<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Semester extends Model
{
    protected $table = 'semester';

    protected $primaryKey = 'semester_id';

    protected $keyType = 'string';

    protected $fillable = [
        'semester_id', //KE KRS
        'year',
        'start_date',
        'end_date'
    ];
}