<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        // \App\Models\User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);



         \App\Models\Inbox::factory(50)->create();

        DB::table('users')->insert([
            'name' => 'Super Admin',
            'email' => 'info@xyberixsolutions.com',
            'email_verified_at' => now(),
            'user_type' => 'super',
            'password' => '$2y$10$paoqU5OOqqj/nsh0.aRule9IN0OwwX31WS9Uqq6A07wT2h5yOEKq6', //password :Xyberix@123!
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('roles')->insert([
            'name' => 'super',
            'guard_name' => 'web',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('model_has_roles')->insert([
            'role_id' => 1,
            'model_type' => 'App\Models\User',
            'model_id' => 1,
        ]);


        DB::table('roles')->insert([
            'name' => 'user',
            'guard_name' => 'web',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);


        DB::table('permissions')->insert([
            'name' => 'create',
            'guard_name' => 'web',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('permissions')->insert([
            'name' => 'update',
            'guard_name' => 'web',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('permissions')->insert([
            'name' => 'delete',
            'guard_name' => 'web',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);

        DB::table('permissions')->insert([
            'name' => 'show',
            'guard_name' => 'web',
            'created_at' => Carbon::now(),
            'updated_at' => Carbon::now()
        ]);


        DB::table('model_has_permissions')->insert([
            'permission_id' => 1,
            'model_type' => 'App\Models\User',
            'model_id' => 1,
        ]);

        DB::table('model_has_permissions')->insert([
            'permission_id' => 2,
            'model_type' => 'App\Models\User',
            'model_id' => 1,
        ]);

        DB::table('model_has_permissions')->insert([
            'permission_id' => 3,
            'model_type' => 'App\Models\User',
            'model_id' => 1,
        ]);

        DB::table('model_has_permissions')->insert([
            'permission_id' => 4,
            'model_type' => 'App\Models\User',
            'model_id' => 1,
        ]);

        \App\Models\Task::factory(50)->create();

    }
}
