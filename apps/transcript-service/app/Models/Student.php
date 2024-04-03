<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Student extends Model 
{    
    protected $table = 'student';

    protected $primaryKey = 'nim';

    protected $keyType = 'string';

    protected $fillable = [
        'nim', //KE KRS
        'email',
        'full_name',
        'major_id', // KE Studyprogram major_id adalah study_program_id
        'entry_year',
        'birth_date',
        'address_id',
        'phone_number'     
    ];

    public function krs()
    {
        return $this->hasMany(KRS::class, "nim", "nim");
    }

    public function studyProgram()
    {
        return $this->belongsTo(StudyProgram::class, 'major_id', 'study_program_id');
    }
}