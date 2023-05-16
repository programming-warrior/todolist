<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\todolist;
use App\Models\user;
use Symfony\Component\HttpFoundation\RateLimiter\RequestRateLimiterInterface;

class todolistController extends Controller
{
    function renderPage(){
        $todolists=null;
        $user=null;
        if(session()->has('user')){
            //get all the users todos
            $todolists=todolist::where('user_id',session('user'))->get();
            $user=user::find(session('user'));
            $user=$user->username;
        }
        return view('home',["todolists"=>$todolists,"username"=>$user]);
    }

    function storeTodo(Request $req){
        $todo=$req->input('todo');
        $user_id=$req->input('user_id');
        $pending=$req->input('pending');

        todolist::create([
            "todo"=>$todo,
            "user_id"=>$user_id,
            "pending"=>$pending,
        ]);

        return response(201);
        
    }

    function deleteTodo(Request $req, $todo_id){
        //delete that paticular todo
        $todolist=todolist::find($todo_id);
        $todolist->delete();

        return response(201);
    }

    function updateTodo(Request $req,$todo_id){
        //update the pending status of the todo.
        $todolist=todolist::find($todo_id);
        $todolist->pending=$todolist->pending==true?false:true;
        $todolist->save();

        return response(201);
    }

    function filterTodo(Request $req){
        $todolist=null;
        $pendingStatus=$req->query('filter');
        if($pendingStatus=='all'){
            $todolist=todolist::where('user_id',session('user'))->get();
            return response()->json(['data'=>$todolist],200);
        }
        else{
            switch($pendingStatus){
                case 'completed':
                    $pendingStatus=false;
                    break;
                case 'pending':
                    $pendingStatus=true;
                    break;
            }
            $todolist=todolist::where('user_id',session('user'))->where('pending',$pendingStatus)->get();
            return response()->json(['data'=>$todolist],200);
        }

    }
}
