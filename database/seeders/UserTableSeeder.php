<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $user = User::create([
            'name' => 'admin',
            'email' => 'admin@owner.com',
            'phone' => '-',
            'password' => bcrypt('admin@owner.com'),
        ]);

        // take all data permission
        $permissions = Permission::all();

        // take role permission with admin value
        $role = Role::find(1);

        // assign all permission authorities to role admin
        $role->syncPermissions($permissions);

        // assign seed admin user with all permission data
        $user->assignRole($role);
    }
}
