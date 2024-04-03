<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    protected $table = 'course';

    protected $primaryKey = 'course_id';

    protected $keyType = 'string';

    protected $fillable = [
        'course_id',
        'course_name',
        'credit_hours',// KE KRS
        'classroom_id',     
    ];

    public function krs()
    {
        return $this->hasMany(KRS::class, 'course_id', 'course_id');
    }
}