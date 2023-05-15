<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\user;

class userController extends Controller
{
    function userSignup(Request $req){
        //get all the values and sanitize them for any potential threat.
        $data=$req->all();
        $username=$data['username'];
        $password=$req->input('password');

        //check if username is available.
        $result=user::where('username',$username)->firstOr(function(){
            return false;
        });
        if($result){
            //user with the username already exits.
            return response()->json(["msg"=>"username is not available"],403);
        }
        //store the user in the database.
        user::create([
            'username'=>$username,
            'password'=>$password,
        ]);

        //create session
        //we need user_id
        $id=user::where('username',$username)->first()['id'];  
        $req->session()->put('user',$id);

        return response(201);
    }
  
    function userLogin(Request $req){
        //get all the values and sanitize them for any potential threat.
        $username=$req->input('username');
        $password=$req->input('password');

        //check if username is available.
        $result=user::where('username',$username)->firstOr(function(){
            return false;
        });

        if(!$result){
            return response()->json(['msg'=>"user doesn't exit"],404);
        }

        //match the password.
        $match=$result['password']===$password;

        if(!$match){
            return response()->json(['msg'=>"incorrect username or password"],403);
        }

        //create session 
        $req->session()->put('user',$result['id']);

        //redirect user to the home page /
        return response(200);
    }
    function userLogout(Request $req){
        if(session()->has('user')){
            session()->pull('user');
            return response(200);
        }
    }
}
