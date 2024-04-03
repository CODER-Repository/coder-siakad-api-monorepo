<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class LectureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = Faker::create();

        $userIds = DB::table('user')->pluck('user_id')->toArray();
        $email = DB::table('user')->pluck('email')->toArray();

        for ($i = 0; $i < 25; $i++) {
            DB::table('lecturer')->insert([
                'nip' => $faker->unique()->randomNumber(9),
                'user_id' => $userIds[$i % count($userIds)],
                'name' => $faker->name,
                'type' => $faker->randomElement(['male', 'female']),
                'phone_number' => $faker->numerify('+##########'),
                'email' => $email[$i % count($email)],
            ]);
        }
    }
}
