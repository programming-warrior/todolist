<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Todolist App</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:wght@400;500;700&family=Hubballi&family=Montserrat:wght@100&family=Poppins:wght@300;400&family=Roboto:wght@300&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<script src="https://kit.fontawesome.com/86dd3a5d4c.js" crossorigin="anonymous"></script>
<script defer src="script/script.js"></script>
<body>
    <nav>
        <ul>
            @if(!session()->has('user'))
                <li><button class="signup-btn">Signup</button></li>
                <li><button class="login-btn">Login</button></li>
            @else
                <li class="username">{{$username}}</li>
                <li><button class="logout-btn">Logout</button></li>
            @endif
        </ul>
        
    </nav>
    <h1 class="header">Track your todos! :)</h1>
        @if(!session()->has('user'))
        <p class="msg" style="text-transform: uppercase">Login in to save,view yours todos. If you don't have the account you can signup. It's free!</p>
        @else
        <div class="main" >
            <form class="add-todo" method="POST" action="/">
                <input name="user_id" value={{session('user')}}  style="display: none"/>
                <input type="text" name="todolist" placeholder="Add todo">
                <button class="add-icon" type="submit">+</button>
            </form>
            @if($todolists==null )

                <p class="msg">You haven't added any todos yet!</p>
            @else
            <div class="todolist-containter">
                <ul class="todolists">
                    @foreach ($todolists as $todolist)
                        <li id={{$todolist['id']}}>
                            <p>{{$todolist['todo']}}</p>
                            <div class="pending-icon">
                                @if($todolist['pending']==true)
                                    <i class="fa-sharp fa-solid fa-xmark" style="color: #e41111; font-size:2rem"></i>
                                @else
                                     <i class="fa-solid fa-check" style="color: #0b9334;"></i>
                                @endif
                            </div>
                            <div class="delete-icon">
                                <i class="fa-sharp fa-solid fa-trash"></i>
                            </div>
                        </li>
                    @endforeach
                </ul>
          
            </div>
        </div>  
            @endif
        @endif

        <form action="signup" method="post" id="signupForm" style="display: none">
            <div class="form-error"></div>
            <div class="close-btn">
            </div>
            <div class="input-container">
                <label>username</label>
                <input type="text" name="username"/>
            </div>
            <div class="input-container">
                <label>Password</label>
                <input name="password" type="password"/>
            </div>
            <div class="input-container">
                <button type="submit">Signup</button>
            </div>
        </form>
        
        <form action="login" method="post" id="loginForm" style="display: none">
            <div class="form-error"></div>
            <div class="close-btn">
            </div>
            <div class="input-container">
                <label>username</label>
                <input type="text" name="username"/>
            </div>
            <div class="input-container">
                <label>Password</label>
                <input name="password" type="password"/>
            </div>
            <div class="input-container">
                <button type="submit">Login</button>
            </div>
        </form>
        
</body>
</html>
