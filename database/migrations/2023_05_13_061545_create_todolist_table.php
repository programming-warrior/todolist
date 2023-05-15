<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users',function(Blueprint $table){
            $table->id();
            $table->string('username');
            $table->string('password');
        });
        Schema::create('todolists', function (Blueprint $table) {
            $table->id();
            $table->string('todo');
            $table->boolean('pending');
            $table->foreignId('user_id');
            $table->timestamps();
        });
        Schema::table('todolists',function(Blueprint $table){
            $table->foreign('user_id')->references('id')->on('users');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        
        Schema::table('todolits',function(Blueprint $table){
            $table->dropForeign('todolists_user_id_foreign');
        });
        Schema::dropIfExists('todolists');
        
        Schema::dropIfExists('users');
    }
};
