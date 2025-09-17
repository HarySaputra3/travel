<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Spatie\Permission\Models\Role;
use function Termwind\render;

class UserController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware('permission:users index', only: ['index']),
            new Middleware('permission:users create', only: ['create', 'store']),
            new Middleware('permission:users edit', only: ['edit', 'update']),
            new Middleware('permission:users delete', only: ['destroy'])
        ];
    }
    public function index(Request $request)
    {
        //get all data user
        $users = User::with('roles')
            ->when(request('search'), fn($query) => $query->where('name', 'like', '%'.request('search').'%'))
            ->orderBy('id', 'ASC')
            ->paginate(6);

            //render view
            return inertia('Users/Index', ['users' => $users, 'filters' => $request->only(['search'])]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //get roles
        $roles = Role::latest()->get();

        //render view
        return inertia('Users/Create', [
            'roles' => $roles,
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validate request
        $request->validate([
            'name' => 'required|min:3|max:255',
            'email' => 'required|email|unique:users',
            'phone' => 'required',
            'password' => 'required|confirmed|min:4',
            'selectedRoles' => 'required|array|min:1',
        ]);

        //create user
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'password' =>bcrypt($request->password),
        ]);

        //attach roles 
        $user->assignRole($request->selectedRoles);

        //render view
        return to_route('users.index');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        //get roles
        $roles = Role::where('name', '!=', 'admin')->get();

        // load roles
        $user->load('roles');

        // render view
        return inertia('Users/Edit', ['user' => $user, 'roles' => $roles]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        //validate request
        $request->validate([
            'name' => 'required|min:3|max:255',
            'email' => 'required|email|unique:users,email,' . $user->id,
            'phone' => 'required',
            'selectedRoles' => 'required|array|min:1',
        ]);


        //update dta user
        $user->update([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
        ]);
        //attach roles
        $user->syncRoles($request->selectedRoles);

        //render view
        return to_route('users.index');

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        //delete user data
        $user->delete();

        //render view
        return back();
    }
}
