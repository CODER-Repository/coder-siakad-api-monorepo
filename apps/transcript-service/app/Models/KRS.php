<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class KRS extends Model
{
    protected $table = 'krs';

    protected $primaryKey = 'krs_id';

    protected $keyType = 'integer';

    protected $fillable = [
        'krs_id',
        'nim',
        'course_id',
        'semester_id', //KE SEMESTER
        'grade', 
    ];

    protected $casts = [
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    public function student()
    {
        return $this->belongTo(Student::class, "nim", "nim");
    }

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id', 'course_id');
    }
}