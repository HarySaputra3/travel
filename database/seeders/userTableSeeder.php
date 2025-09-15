<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;

class userTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //create user
        $user = User::create([
            'name' => 'super admin',
            'email' => 'superadmin@gmail.com',
            'phone' => '-',
            'password' => bcrypt('password'),
        ]);
        //get all permission
        $permission = Permission::all();

        //get role admin
        $role = Role::find(1);

        //assign permissions to role
        $role->syncPermissions($permission);

        //assign role to user
        $user->assignRole($role);
    }

}
