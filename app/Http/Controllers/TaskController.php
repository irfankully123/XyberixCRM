<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{

    public function index(Request $request): Response
    {
        return Inertia::render('Tasks/TaskIndex');
    }

    public function getTasks(Request $request): JsonResponse
    {
        return response()->json([
            'tasks' => Task::query()
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('title', 'like', '%' . $search . '%')
                        ->orWhere('description', 'like', '%' . $search . '%');
                })
                ->orderBy('id', 'desc')
                ->paginate($request->input('perPage'))
                ->withQueryString()
        ]);
    }
}
