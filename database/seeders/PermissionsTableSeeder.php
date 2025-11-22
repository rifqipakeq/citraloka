<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Spatie\Permission\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //permission users
        Permission::create(['name' => 'users index', 'guard_name' => 'web']);
        Permission::create(['name' => 'users create', 'guard_name' => 'web']);
        Permission::create(['name' => 'users edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'users delete', 'guard_name' => 'web']);

        //permission roles
        Permission::create(['name' => 'roles index', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles create', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'roles delete', 'guard_name' => 'web']);

        //permission permissions
        Permission::create(['name' => 'permissions index', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions create', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'permissions delete', 'guard_name' => 'web']);

        //permission permissions
        Permission::create(['name' => 'categories index', 'guard_name' => 'web']);
        Permission::create(['name' => 'categories create', 'guard_name' => 'web']);
        Permission::create(['name' => 'categories edit', 'guard_name' => 'web']);
        Permission::create(['name' => 'categories delete', 'guard_name' => 'web']);

         //permission permissions
         Permission::create(['name' => 'locations index', 'guard_name' => 'web']);
         Permission::create(['name' => 'locations create', 'guard_name' => 'web']);
         Permission::create(['name' => 'locations edit', 'guard_name' => 'web']);
         Permission::create(['name' => 'locations delete', 'guard_name' => 'web']);

         //permission permissions
         Permission::create(['name' => 'reviews index', 'guard_name' => 'web']);
         Permission::create(['name' => 'reviews edit', 'guard_name' => 'web']);
         Permission::create(['name' => 'reviews delete', 'guard_name' => 'web']);


         Permission::create(['name' => 'tickets index', 'guard_name' => 'web']);
         Permission::create(['name' => 'tickets create', 'guard_name' => 'web']);
         Permission::create(['name' => 'tickets edit', 'guard_name' => 'web']);
         Permission::create(['name' => 'tickets delete', 'guard_name' => 'web']);

         Permission::create(['name' => 'transactions index', 'guard_name' => 'web']);

         Permission::create(['name' => 'regions index', 'guard_name' => 'web']);
         Permission::create(['name' => 'regions create', 'guard_name' => 'web']);
         Permission::create(['name' => 'regions edit', 'guard_name' => 'web']);
         Permission::create(['name' => 'regions delete', 'guard_name' => 'web']);
    }
}
