<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\todolistController;
use App\Http\Controllers\userController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/',[todolistController::class,"renderPage"]);
Route::post('/',[todolistController::class,"storeTodo"]);
Route::put('/{id}',[todolistController::class,"updateTodo"]);
Route::delete('/{id}',[todolistController::class,"deleteTodo"]);
Route::get('/reget',[todolistController::class,"filterTodo"]);

Route::post('/login',[userController::class,"userLogin"]);
Route::post('/signup',[userController::class,"userSignup"]);

Route::get('/logout',[userController::class,"userLogout"]);

