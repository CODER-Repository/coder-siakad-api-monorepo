<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class StudyProgram extends Model
{
    protected $table = 'study_program';

    protected $primaryKey = 'study_program_id';

    protected $keyType = 'integer';

    protected $fillable = [
        'study_program_id', //KE student
        'study_program_name',
        'faculty_id',
    ];

    public function student()
    {
        return $this->hasMany(Student::class, 'major_id', 'study_program_id');
    }
}